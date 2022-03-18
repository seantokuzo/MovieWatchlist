import React, { useEffect, useState } from 'react'
import Header from './components/Header.js'
import SearchPage from './components/SearchPage.js'
import Watchlist from './components/Watchlist.js'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [showWatchlist, setShowWatchlist] = useState(false)
  const [myWatchlist, setMyWatchlist] = useState([])

  const bgStyle = {
    backgroundColor: darkMode ? 'var(--bg-dark)' : 'var(--bg-light)',
    color: darkMode ? 'var(--text-dm)' : 'var(--text-lm)',
  }

  function reorderUp(id) {
    const currentMovie = myWatchlist.filter((movie) => movie.cardId === id)
    const currentMovieIndex = myWatchlist.indexOf(...currentMovie)
    if (currentMovieIndex === 0) return

    setMyWatchlist((prevWatchlist) => [
      ...prevWatchlist.slice(0, currentMovieIndex - 1),
      ...currentMovie,
      ...prevWatchlist.slice(currentMovieIndex - 1, currentMovieIndex),
      ...prevWatchlist.slice(currentMovieIndex + 1),
    ])
  }

  function reorderDown(id) {
    const currentMovie = myWatchlist.filter((movie) => movie.cardId === id)
    const currentMovieIndex = myWatchlist.indexOf(...currentMovie)
    if (currentMovieIndex === myWatchlist.length - 1) return

    setMyWatchlist((prevWatchlist) => [
      ...prevWatchlist.slice(0, currentMovieIndex),
      ...prevWatchlist.slice(currentMovieIndex + 1, currentMovieIndex + 2),
      ...currentMovie,
      ...prevWatchlist.slice(currentMovieIndex + 2),
    ])
  }

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = 'var(--bg-dark)'
    } else document.body.style.backgroundColor = 'var(--bg-light)'
  }, [darkMode])

  function toggleWatchlist() {
    setShowWatchlist((prevState) => !prevState)
  }

  function addToWatchlist(poster, title, rating, runtime, genre, plot, cardId) {
    setMyWatchlist((prevWatchlist) => [
      ...prevWatchlist,
      {
        poster,
        title,
        rating,
        runtime,
        genre,
        plot,
        cardId,
      },
    ])
  }

  // localStorage.clear()
  useEffect(() => {
    if (localStorage.getItem('myWatchlist')) {
      setMyWatchlist(JSON.parse(localStorage.getItem('myWatchlist')))
    } else return
  }, [])

  useEffect(() => {
    localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist))
  }, [myWatchlist])

  const togglerEl = (
    <div className="toggler-div">
      <label className="switch">
        <input id="toggler" type="checkbox" onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>
    </div>
  )

  function removeFromWatchlist(poster) {
    setMyWatchlist((prevWatchlist) => {
      return prevWatchlist.filter((movie) => movie.poster !== poster)
    })
  }

  return (
    // <main style={bgStyle}>
    <main style={bgStyle}>
      {togglerEl}
      <Header
        showWatchlist={showWatchlist}
        toggleWatchlist={toggleWatchlist}
        toggleDarkMode={toggleDarkMode}
      />
      {showWatchlist ? (
        <Watchlist
          myWatchlist={myWatchlist}
          darkMode={darkMode}
          removeFromWatchlist={removeFromWatchlist}
          toggleWatchlist={toggleWatchlist}
          reorderUp={reorderUp}
          reorderDown={reorderDown}
        />
      ) : (
        <SearchPage
          darkMode={darkMode}
          addToWatchlist={addToWatchlist}
          showWatchlist={showWatchlist}
        />
      )}
    </main>
  )
}

export default App
