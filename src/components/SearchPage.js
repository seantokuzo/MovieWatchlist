import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import MovieCard from './MovieCard.js'

export default function SearchPage(props) {
  //   const seantokuzoKey = '1b0b3909'
  // const skuzoKey = '6bca848f'
  const cjKey = 'e7bfdf8f'
  const [noResults, setNoResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [movieCards, setMovieCards] = useState([])

  function handleSearch(e) {
    fetch(`http://www.omdbapi.com/?apikey=${cjKey}&s=${e.target.value}&page=1`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.Error === 'Incorrect IMDb ID.') {
          setNoResults(false)
          setMovieCards([])
        } else if (data.Response === 'False') {
          setNoResults(true)
          setSearchResults([])
          setFilteredResults([])
          setMovieCards([])
        } else if (data.Search) {
          setSearchResults(data.Search.map((results) => results.imdbID))
          setNoResults(false)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    setFilteredResults([])
    if (searchResults.length > 0) {
      searchResults.map((id) => {
        fetch(`http://www.omdbapi.com/?apikey=${cjKey}&i=${id}`)
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
                cardId: id,
              },
            ])
          })
        return null
      })
    } else return
  }, [searchResults])

  useEffect(() => {
    setMovieCards(
      filteredResults.map((movie) => {
        return (
          <MovieCard
            key={nanoid()}
            poster={movie.poster}
            title={movie.title}
            rating={movie.rating}
            runtime={movie.runtime}
            genre={movie.genre}
            plot={movie.plot}
            cardId={movie.cardId}
            darkMode={props.darkMode}
            addToWatchlist={props.addToWatchlist}
          />
        )
      })
    )
  }, [filteredResults, props.addToWatchlist, props.darkMode])

  const searchFieldStyle = {
    border: props.darkMode ? 'none' : '1px solid var(--plot-lm)',
  }

  const changingColor = {
    color: props.darkMode ? 'var(--dark-grey)' : 'var(--light-grey)',
  }

  const startExploring = (
    <div className="start-exploring-div" style={changingColor}>
      <i className="fa-solid fa-film"></i>
      <h3>Start exploring</h3>
    </div>
  )

  const cantFind = (
    <div className="start-exploring-div" style={changingColor}>
      <h3>Unable to fund what you're looking for. Please try another search.</h3>
    </div>
  )

  function whoToRender() {
    if (noResults) {
      return cantFind
    } else if (movieCards.length > 0) {
      return movieCards
    } else return startExploring
  }

  return (
    <div className="page-container">
      <input
        onChange={handleSearch}
        type="search"
        placeholder="Search for a movie"
        results="0"
        maxLength={80}
        minLength={1}
        style={searchFieldStyle}
      ></input>
      {whoToRender()}
      {/* <MovieCard darkMode={props.darkMode} /> */}
    </div>
  )
}
