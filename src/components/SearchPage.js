import React, { useState } from 'react'
import MovieCard from './MovieCard.js'

export default function SearchPage(props) {
  const apiKey = '1b0b3909'
  const [movieCards, setMovieCards] = useState([])

  function handleSearch(e) {
    console.log(e.target.value)
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${e.target.value}&page=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // console.log(data.Search[0].imdbRating)
        setMovieCards(
          data.Search.map((result) =>
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${result.imdbID}&plot=short`)
              .then((res) => res.json())
              .then((data) => {
                console.log(data)
                return (
                  <MovieCard
                    poster={data.Poster}
                    title={data.Title}
                    rating={data.imdbRating}
                    runtime={data.Runtime}
                    genre={data.Genre}
                    plot={data.Plot}
                    darkMode={props.darkMode}
                  />
                )
              })
          )
        )
      })
      .catch((err) => console.log('FUCK!'))
  }

  return (
    <div className="page-container">
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search for a movie"
        results="0"
        maxLength={80}
        minLength={1}
      ></input>
      {movieCards}
      {/* <MovieCard darkMode={props.darkMode} /> */}
    </div>
  )
}

{
  /* <i class="fa-solid fa-magnifying-glass"></i> */
}
