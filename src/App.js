import React, { useState } from 'react'
import Header from './components/Header.js'
import SearchPage from './components/SearchPage.js'
import Watchlist from './components/Watchlist.js'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [showWatchlist, setShowWatchlist] = useState(false)
  console.log(showWatchlist)

  const bgStyle = {
    backgroundColor: darkMode ? 'var(--bg-dark)' : 'var(--bg-light)',
    color: darkMode ? 'var(--text-dm)' : 'var(--text-lm)',
  }

  function toggleWatchlist() {
    setShowWatchlist((prevState) => !prevState)
  }

  return (
    // <main style={bgStyle}>
    <main style={bgStyle}>
      <Header showWatchlist={showWatchlist} toggleWatchlist={toggleWatchlist} />
      {showWatchlist ? <Watchlist /> : <SearchPage darkMode={darkMode} />}
    </main>
  )
}

export default App
