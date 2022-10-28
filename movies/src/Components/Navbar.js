import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class  extends Component {
  render() {
    return (
      <div style={{display:"flex",background:"",padding:"10px"}}>
        <Link to='/'  style={{textDecoration:'none'}}> <h1>Movies App</h1></Link>
         
          <Link to='/favourites' style={{textDecoration:'none'}}><h2 style={{marginLeft:"2rem",marginTop:"1.8rem"}}>Favourites</h2></Link>
      </div>
    )
  }
}
