import React, { useEffect, useState } from 'react'
import Header from './components/Header.js'
import SearchPage from './components/SearchPage.js'
import Watchlist from './components/Watchlist.js'

function App() {
  const [alert, setAlert] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showWatchlist, setShowWatchlist] = useState(false)
  const [myWatchlist, setMyWatchlist] = useState([])

  // ***** BACKGROUND COLOR - CONDITIONAL ON DARKMODE *****
  const bgStyle = {
    backgroundColor: darkMode ? 'var(--bg-dark)' : 'var(--bg-light)',
    color: darkMode ? 'var(--text-dm)' : 'var(--text-lm)',
  }

  // ***** CHANGE BODY COLOR ON DARKMODE CHANGE *****
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = 'var(--bg-dark)'
    } else document.body.style.backgroundColor = 'var(--bg-light)'
  }, [darkMode])

  // ***** TOGGLE DARKMODE *****
  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  // ***** TOGGLE WATCHLIST / SEARCH PAGE *****
  function toggleWatchlist() {
    setShowWatchlist((prevState) => !prevState)
  }

  // ***** GET WATCHLIST FROM LOCAL STORAGE *****
  useEffect(() => {
    if (localStorage.getItem('myWatchlist')) {
      setMyWatchlist(JSON.parse(localStorage.getItem('myWatchlist')))
    } else return
  }, [])
  // ***** UPDATE WATCHLIST IN LOCAL STORAGE ANYTIME IT CHANGES *****
  useEffect(() => {
    localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist))
  }, [myWatchlist])

  // ***** ADD MOVIE TO WATCHLIST HANDLER *****
  function addToWatchlist(poster, title, rating, runtime, genre, plot, cardId) {
    if (!myWatchlist.every((movie) => movie.cardId !== cardId)) {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 1000)
      return
    }
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

  // ***** REMOVE MOVIE FROM WATCHLIST HANDLER *****
  function removeFromWatchlist(poster) {
    setMyWatchlist((prevWatchlist) => {
      return prevWatchlist.filter((movie) => movie.poster !== poster)
    })
  }

  // ***** REORDERING WATCHLIST HANDLERS - MOVE UP *****
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

  // ***** REORDERING WATCHLIST HANDLERS - MOVE DOWN *****
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

  // ***** DARKMODE TOGGLER ELEMENT *****
  const togglerEl = (
    <div className="toggler-div">
      <label className="switch">
        <input id="toggler" type="checkbox" onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>
    </div>
  )

  const duplicateMovieAlert = <h5 className="popup fade-out">Move already on watchlist!</h5>

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
      {alert && duplicateMovieAlert}
    </main>
  )
}

export default App
