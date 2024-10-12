import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

export class Navbar extends Component {


  constructor(props){
    super(props);
    this.state={
      searchQuery: ""
    };
  }

handleInputChange = (e)=>{
  this.setState({searchQuery:e.target.value})
}
handleSearch = (e)=>{
  e.preventDefault();
  console.log("searching for: ",this.state.searchQuery)
  this.props.onSearchSubmit(this.state.searchQuery);//*********calling the method passed from App.js which passes the searchQuery from navbar to app.js**********

}
handleCategoryClick=()=>{
  this.props.clearSearchQuery();// Clear the search query when a category is clicked
  this.setState({searchQuery: ""});
}

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" onClick={this.handleCategoryClick}>myNEWS</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/" onClick={this.handleCategoryClick}>Home</Link>
        </li>
        {/* <li className="nav-item"><Link className="nav-link" to="/about">About</Link> </li> */}
        <li className="nav-item"><Link className="nav-link" to="/business" onClick={this.handleCategoryClick}>Business</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/entertainment" onClick={this.handleCategoryClick}>Entertainment</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/general" onClick={this.handleCategoryClick}>General</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/health" onClick={this.handleCategoryClick}>Health</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/science" onClick={this.handleCategoryClick}>Science</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/sports" onClick={this.handleCategoryClick}>Sports</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/technology" onClick={this.handleCategoryClick}>Technology</Link></li>
      </ul>
      <form className="d-flex ms-auto" role="search" onSubmit={this.handleSearch}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={this.props.searchQuery} onChange={this.handleInputChange}/>
        <button className="btn btn-outline-success" type="submit" >Search</button>
      </form>
    </div>
  </div>
</nav>
      </div>
    )
  }
}

export default Navbar
