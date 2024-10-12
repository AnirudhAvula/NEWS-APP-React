import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import ReactDOM from "react-dom/client"
import LoadingBar from 'react-top-loading-bar';
import{
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"


// const router = createBrowserRouter([
// {
//   path: "/",
//   element: <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="general" />
// },
// {
// path: "/business",
// element: <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="business" />
// },
// {
//   path: "/sports",
//   element: <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="sports" />
//   },

//   {
//     path: "/health",
//     element: <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="health" />
//     },
// {
// path: "/entertainment",
// element: <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="entertainment" />
// },
// {
//   path: "/technology",
//   element: <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="technology" />
//   },
// {
// path: "/science",
// element: <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="science" />
// },

// ]
// )

export default class App extends Component {

apikey = process.env.REACT_APP_NEWS_API

 constructor(props){
  super(props)
  this.state={
    searchQuery:'',  //Search query is managed in App
    progress : 0,
    
  }
 }
 //Method to handle search submission from Navbar
 handleSearchSubmit=(query)=>{
  this.setState({
    searchQuery : query
  })
  console.log("Search query submitted:", query)
 }
 clearSearchQuery=()=>{
  this.setState({
    searchQuery: ''
  })
  console.log("Search Query Cleared!!")
 };



 setProgress=(progress)=>{
  this.setState({
    progress: progress
  })
 }



  
  render() {
    const {searchQuery} = this.state;
    return (
      <div>
        <BrowserRouter>
        {/* Pass the method to NAVBAR as aprop named onSearchSubmit */}
        <Navbar onSearchSubmit={this.handleSearchSubmit} clearSearchQuery={this.clearSearchQuery}/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        {/* <RouterProvider router={router}/> */}
        <Routes>
          <Route path= "/" 
          element={ <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="general" searchQuery={this.state.searchQuery} />}/>
        
        <Route path= "/business" 
          element={ <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} key="business" pageSize={15} country="us" category="business" searchQuery={this.state.searchQuery} />}/>
        <Route path= "/science" 
          element={ <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} key="science"  pageSize={15} country="us" category="science" searchQuery={this.state.searchQuery}/>}/>
        <Route path= "/entertainment" 
          element={ <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} key="entertainment"  pageSize={15} country="us" category="entertainment" searchQuery={this.state.searchQuery}/>}/>
        <Route path= "/sports" 
          element={ <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} key="sports" pageSize={15} country="us" category="sports" searchQuery={this.state.searchQuery}/>}/>
        <Route path= "/health" 
          element={ <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} key="health"  pageSize={15} country="us" category="health" searchQuery={this.state.searchQuery} />}/>
        <Route path= "/technology" 
          element={ <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} key="technology"  pageSize={15} country="us" category="technology" searchQuery={this.state.searchQuery}/>}/>
        <Route path= "/general" 
          element={ <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} key="general" pageSize={15} country="us" category="general" searchQuery={this.state.searchQuery}/>}/>
        

        </Routes>
        </BrowserRouter>
       
       {/* <News setProgress={this.setProgress.bind(this)} apikey={this.apikey} pageSize={15} country="us" category="sports" />  */}
       
      </div>
    )
  }
}

