import React, { Component } from 'react'
import Internet from './Internet.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Internet} alt="loading" />
      </div>
    )
  }
}
