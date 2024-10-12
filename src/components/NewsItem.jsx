import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {
    let {title, description,imageUrl,newsUrl,author,date,source}=this.props
    return (
      <div className='my-3'>
        <div className="card" >
    <img src={imageUrl } className="card-img-top" alt="Image NOT provided"/>
    <div className="card-body">
    <h5 className="card-title">{title}.. </h5>
    <p className="card-text">{description}...<br/><span className="badge rounded-pill text-bg-warning">{source}</span></p>
    <p className='card-text'><small className='text-muted'>By <b><i>{!author?"Unknown":author}</i></b> on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noopener noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More..</a>
    </div>
    </div>
      </div>
    )
  }
}

export default NewsItem
