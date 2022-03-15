import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard.js'

export default function SearchPage(props) {
  const apiKey = '1b0b3909'
  const [searchResults, setSearchResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [movieCards, setMovieCards] = useState(null)

  function handleSearch(e) {
    // console.log(e.target.value)
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&page=1&s=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.Search)
        setSearchResults(data.Search.map((results) => results.imdbID))
      })
      .catch((err) => console.log('FUCK!'))
  }

  useEffect(() => {
    setFilteredResults([])
    searchResults.map((id) => {
      fetch(`http://www.omdbapi.com/?apikey=${apiKey}&page=1&i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setFilteredResults((prevFilteredResults) => [
            ...prevFilteredResults,
            {
              poster: data.Poster,
              title: data.Title,
              rating: data.imdbRating,
              runtime: data.Runtime,
              genre: data.Genre,
              plot: data.Plot,
            },
          ])
        })
    })
  }, [searchResults])

  useEffect(() => {
    setMovieCards(
      filteredResults.map((movie) => {
        return (
          <MovieCard
            poster={movie.poster}
            title={movie.title}
            rating={movie.rating}
            runtime={movie.runtime}
            genre={movie.genre}
            plot={movie.plot}
            darkMode={props.darkMode}
          />
        )
      })
    )
  }, [filteredResults])

  console.log(filteredResults)

  return (
    <div className="page-container">
      <input
        onChange={handleSearch}
        type="search"
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

//  movieData = {
//    poster: data.Poster,
//    title: data.Title,
//    rating: data.imdbRating,
//    runtime: data.Runtime,
//    genre: data.Genre,
//    plot: data.plot,
//  }

// Actors: "Jackie Chan, John Cusack, Adrien Brody"
// Awards: "4 wins & 2 nominations"
// BoxOffice: "$74,068"
// Country: "China, Hong Kong"
// DVD: "22 Dec 2015"
// Director: "Daniel Lee"
// Genre: "Action, Drama, Fantasy"
// Language: "Mandarin, English, Latin"
// Metascore: "41"
// Plot: "When corrupt Roman leader Tiberius arrives with a giant army to claim the Silk Road, Huo An teams up his army with an elite Legion of defected Roman soldiers led by General Lucius to protect his country and his new friends."
// Poster: "https://m.media-amazon.com/images/M/MV5BMTk0MjgxOTQ5MF5BMl5BanBnXkFtZTgwODA3NTUwNjE@._V1_SX300.jpg"
// Production: "N/A"
// Rated: "R"
// Ratings: (3) [{…}, {…}, {…}]
// Released: "04 Sep 2015"
// Response: "True"
// Runtime: "127 min"
// Title: "Dragon Blade"
// Type: "movie"
// Website: "N/A"
// Writer: "Daniel Lee"
// Year: "2015"
// imdbID: "tt3672840"
// imdbRating: "6.0"
// imdbVotes: "19,671"

//  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${result.imdbID}&plot=short`)
//               .then((res) => res.json())
//               .then((data) => {
//                 console.log(data)
//                 return (
//                   <MovieCard
//                     poster={data.Poster}
//                     title={data.Title}
//                     rating={data.imdbRating}
//                     runtime={data.Runtime}
//                     genre={data.Genre}
//                     plot={data.Plot}
//                     darkMode={props.darkMode}
//                   />
//                 )
//               })

{
  /* <i class="fa-solid fa-magnifying-glass"></i> */
}
