import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    country : 'us',
    pageSize : 8,
    category : "general"
  }
  static propTypes={
    pageSize : PropTypes.number, 
    country : PropTypes.string,
    category : PropTypes.string,
    searchQuery: PropTypes.string, // Define searchQuery in prop types
  }
    articles =[]


    constructor(props){
        super(props);
        console.log("Hello I am a constructor");
        this.state = {//state...........
            articles :this.articles,
            loading: true,
            page:1,
            totalResults: 0,
            pageSize : this.props.pageSize,
            
            // searchQuery : this.props.searchQuery


        }
        document.title = `myNEWS-${this.props.category.toUpperCase()}`

    }
    
    
    async componentDidMount(){
        console.log("cdm");
        this.fetchArticles();
    }

    componentDidUpdate(prevProps){
      if(prevProps.searchQuery !== this.props.searchQuery){
        this.fetchArticles();
      }
    }

    fetchArticles = async () =>{
      this.props.setProgress(0);
      this.props.setProgress(30);
      console.log("progress:30")
        let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pagesize=${this.props.pageSize}&apiKey=${this.props.apikey}`
        if (this.props.searchQuery){
          console.log(this.props.searchQuery)
          url=`https://newsapi.org/v2/everything?q=${this.props.searchQuery}&apiKey=${this.props.apikey}`
        }
        this.props.setProgress(50);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        if(parsedData.articles){
        let uniqueArticles = parsedData.articles.filter((article,index,self)=>{
            // index===self.findIndex((a)=>a.url === article.url))   removes the duplicate ones and keeps/prints the original
            //const occurences = self.filter((a)=>a.url===article.url).length;
            //return occurences ===1; //this filter removes both dup and original
            return article.title !== '[Removed]' && index === self.findIndex((a) => a.url === article.url)
        })
        this.setState({articles: uniqueArticles,
          totalResults : parsedData.totalResults,//stores the total results returned by API
          loading : false  
        })
        this.props.setProgress(100);
    
      
    } else{
         // Handle the case where no articles are returned
         console.error('No articles found in the API response');
         this.setState({
             articles: [], // Empty the articles state
             totalResults: 0, // Set totalResults to 0 since no articles were found
             loading:false
      }
         )
    }
  }
    handlePreviousClick=async ()=>{
      //update page state and fetch previous articles
      this.setState({
        loading : true,
        page: this.state.page -1}, 
        async ()=> {
        await  this.fetchArticles();
        
      })
    }

    handleNextClick=()=>{
      this.setState({
        loading : true,
        page : this.state.page +1},
        ()=>{
          this.fetchArticles();
        }
      )
    }

    // fetchMoreData = async() => {
    //   this.setState({ loading: true });
    //  this.setState((prevState)=>({page:prevState.page+1}),
    //  async()=>{
      
    //  let  url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pagesize=${this.props.pageSize}&apiKey=aff372543a7143a2ae32cb77eaff0dd6`
    //     if (this.props.searchQuery){
    //       console.log(this.props.searchQuery)
    //       url=`https://newsapi.org/v2/everything?q=${this.props.searchQuery}&apiKey=aff372543a7143a2ae32cb77eaff0dd6`
    //     }
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData)
      
    //     let uniqueArticles = parsedData.articles.filter((article,index,self)=>{
    //         // index===self.findIndex((a)=>a.url === article.url))   removes the duplicate ones and keeps/prints the original
    //         return article.title!=="[Removed]" && index===self.findIndex((a)=>a.url === article.url)
    //         //   return false}
    //         //   else{
    //         //     return true}
              

    //         // return index===self.findIndex((a)=>a.url === article.url)
    //           } 
    //     );
      
    //     // prevState.articles.concat(uniqueArticles)
    //     this.setState((prevState)=>({articles: prevState.articles.concat(uniqueArticles),
    //       totalResults : parsedData.totalResults,//stores the total results returned by API
    //       loading : false  
    //     }));
      
    //   })
    
    // };
   
    render() {
      console.log("Current Articles:", this.state.articles);

     // const {articles, page, pageSize , totalResults} = this.state;
    return (
      <div className='container my-3' >
        <h1 className="text-center" style={{margin:"50px"}}>{`myNEWS - TOP ${this.props.category.toUpperCase()} HEADLINES`}</h1>
        {this.state.loading && <Spinner/>}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        > */}
        <div className="row justify-content-center">
        { !this.state.loading && this.state.articles.map((element,index)=>(//iteration to show the newsitems in the news_component using return in map function
             <div className="col-md-4 d-flex justify-content-center"  key={`${element.url}-${index}`}> 
            <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            ))}


            
        </div>
        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={(this.state.page === Math.ceil(this.state.totalResults/this.state.pageSize))?true:false} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
    }

export default News
