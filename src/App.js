import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API)
  }, []);


  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
      });
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if(searchTerm) {
      getMovies(SEARCH_API + searchTerm)
    
    setSearchTerm("")}
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search a Movie"
            value={searchTerm}
            onChange={handleOnChange}
          ></input>
        </form>
      </header>{" "}
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      
    </>
  )
}

export default App;
