import React from 'react'
import MovieCard from './MovieCard'
import { nanoid } from 'nanoid'

export default function Watchlist(props) {
  const movieCards = props.myWatchlist
    ? props.myWatchlist.map((movie) => {
        return (
          <MovieCard
            key={nanoid()}
            poster={movie.poster}
            title={movie.title}
            rating={movie.rating}
            runtime={movie.runtime}
            genre={movie.genre}
            plot={movie.plot}
            darkMode={props.darkMode}
            watchlist={true}
            removeFromWatchlist={props.removeFromWatchlist}
          />
        )
      })
    : null

  const emptyWatchlist = (
    <div className="empty-watchlist-div">
      <h3>Your watchlist is looking a little empty...</h3>
      <div className="empty-add-div" onClick={props.toggleWatchlist}>
        <i className="fa-solid fa-circle-plus"></i>
        <h5>Let's add some movies!</h5>
      </div>
    </div>
  )

  return <div id="page-container">{props.myWatchlist.length > 0 ? movieCards : emptyWatchlist}</div>
}
