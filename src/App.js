import React, { useEffect, useState } from 'react'
import Header from './components/Header.js'
import SearchPage from './components/SearchPage.js'
import Watchlist from './components/Watchlist.js'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [showWatchlist, setShowWatchlist] = useState(false)
  const [myWatchlist, setMyWatchlist] = useState([])
  // console.log(showWatchlist)

  const bgStyle = {
    backgroundColor: darkMode ? 'var(--bg-dark)' : 'var(--bg-light)',
    color: darkMode ? 'var(--text-dm)' : 'var(--text-lm)',
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

  function addToWatchlist(poster, title, rating, runtime, genre, plot) {
    setMyWatchlist((prevWatchlist) => [
      ...prevWatchlist,
      {
        poster,
        title,
        rating,
        runtime,
        genre,
        plot,
      },
    ])
  }

  useEffect(() => {
    // localStorage.clear()
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

  // console.log(myWatchlist)

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
