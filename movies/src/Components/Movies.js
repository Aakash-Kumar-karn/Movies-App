

import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios'

export default class Movies extends Component {
  constructor(){
    super();
    this.state={
      hover:' ',
      parr:[1],
      currPage:1,
      movies:[],
      favourites:[]
    }
  }

 async componentDidMount(){
    let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=451065a575e06b3dd7190cf15d21fe5f&language=en-US&page=${this.state.currPage}`)
    let data=res.data; 
    console.log(data);
    this.setState({
      movies:[...data.results]
    })
  }

  changeMovies= async()=>{
    let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=451065a575e06b3dd7190cf15d21fe5f&language=en-US&page=${this.state.currPage}`)
    let data=res.data;
    // console.log(data);
    this.setState({
      movies:[...data.results]
    })
  }

  handleNext=()=>{
    let temp=[];
    for(let i=1;i<=this.state.parr.length+1;i++){
      temp.push(i)
    }
    this.setState({
      parr:[...temp],
      currPage:this.state.currPage+1

    },this.changeMovies)
   
  }

  handlePrevious=()=>{
    if(this.state.currPage!=1){
      this.setState({
        currPage:this.state.currPage-1
      },this.changeMovies)
    }
  }

  handleClick=(value)=>{
    if(this.state.currPage!=value){
      this.setState({
        currPage:value
      },this.changeMovies)
    }
  }

  handleFav=(movie)=>{
    let oldData=JSON.parse(localStorage.getItem('movies') || '[]')
    if(this.state.favourites.includes(movie.id)){
      oldData=oldData.filter((m)=>m.id!=movie.id)
    }
    else{
      oldData.push(movie)
    }
    localStorage.setItem('movies',JSON.stringify(oldData))
    this.handleFavState();
  }

  handleFavState=()=>{
    let oldData=JSON.parse(localStorage.getItem('movies') || '[]')
    let temp=oldData.map((obj)=> obj.id)
    this.setState({
      favourites:[...temp]
    })

    
  }
  render() {
   
    // let movie=movies.results;
    return (
      <>
      {
        
       this.state.movies.length===0 ?
       <div className="spinner-border text-primary" role="status">
       <span className="visually-hidden">Loading...</span>
        </div> :
        <div>
          <h3 className="text-center">Trending</h3>
          <div className="movie-list">
          {
             this.state.movies.map((movieObj)=>(
              <div className="card movie-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
              <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..."/>
              {/* <div className="card-body"> */}
                <h5 className="card-title movie-title">{movieObj.title}</h5>
                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                <div className="btn-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                  {
                    this.state.hover==movieObj.id && <a  className="btn btn-primary movie-btn" onClick={()=> this.handleFav(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove From Favourites":"Add To Favourites"}</a>
                  }
                
                </div>
              {/* </div> */}
            </div>
            ))
          }
        </div>
          
        <div style={{display:'flex',justifyContent:'center'}}>
        <nav aria-label="Page navigation example text-center">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#" onClick={this.handlePrevious}>Previous</a></li>{
            this.state.parr.map((value)=>(
              <li class="page-item"><a class="page-link" onClick={() =>this.handleClick(value)}>{value}</a></li>
            ))
          }
         
          <li class="page-item"><a class="page-link" onClick={this.handleNext} href="#">Next</a></li>
        </ul>   
        </nav>
        </div>
        </div>
      }
      </>
    )
  }
}

