import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import MovieCard from './MovieCard.js'

export default function SearchPage(props) {
  const tmdbKey = '3259933c93801a8673fb6333e45681c4'
  const [noResults, setNoResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [movieCards, setMovieCards] = useState([])

  // ***** SEARCH HANDLER - FETCH DATA *****
  function handleSearch(e) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${e.target.value}&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setNoResults(false)
          setMovieCards([])
        } else if (data.total_results === 0) {
          setNoResults(true)
          setSearchResults([])
          setMovieCards([])
        } else if (data.results.length > 0) {
          setSearchResults(
            data.results.map((movie) => ({
              id: movie.id,
              poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
              title: movie.title,
              rating: movie.vote_average,
              date: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
              genre: movie.genre_ids,
              plot: movie.overview,
            }))
          )
          setNoResults(false)
        }
      })
      .catch((err) => console.log(err))
  }

  // ***** ON SEARCH RESULTS - MAP OUT MOVIE CARDS FROM DATA *****
  useEffect(() => {
    setMovieCards(
      searchResults.slice().map((movie) => {
        return (
          <MovieCard
            key={nanoid()}
            cardId={movie.id}
            poster={`${movie.poster}`}
            title={movie.title}
            rating={movie.rating}
            date={movie.date}
            genre={movie.genre}
            plot={movie.plot}
            darkMode={props.darkMode}
            addToWatchlist={props.addToWatchlist}
          />
        )
      })
    )
  }, [searchResults, props.addToWatchlist, props.darkMode])

  // ***** DYNAMIC STYLES *****
  const searchFieldStyle = {
    border: props.darkMode ? 'none' : '1px solid var(--plot-lm)',
  }

  const changingColor = {
    color: props.darkMode ? 'var(--dark-grey)' : 'var(--light-grey)',
  }

  // ***** START EXPLORING / NO RESULTS DISPLAYS *****
  const startExploringEl = (
    <div className="start-exploring-div" style={changingColor}>
      <i className="fa-solid fa-film"></i>
      <h3>Start exploring</h3>
    </div>
  )

  const cantFindEl = (
    <div className="start-exploring-div" style={changingColor}>
      <h3>
        Unable to fund what you're looking for. Please try another search.
      </h3>
    </div>
  )

  // ***** FUNCTION TO FIGURE OUT WHICH ELEMENT TO DISPLAY *****
  function whoToRender() {
    if (noResults) {
      return cantFindEl
    } else if (movieCards.length > 0) {
      return movieCards
    } else return startExploringEl
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
        style={searchFieldStyle}
      ></input>
      {whoToRender()}
    </div>
  )
}
