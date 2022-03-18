import React from 'react'
import MovieCard from './MovieCard'
import { nanoid } from 'nanoid'

export default function Watchlist(props) {
  const movieCards =
    props.myWatchlist.length > 0 ? (
      props.myWatchlist.map((movie) => {
        return (
          <MovieCard
            key={nanoid()}
            cardId={movie.cardId}
            poster={movie.poster}
            title={movie.title}
            rating={movie.rating}
            date={movie.date}
            genre={movie.genre}
            plot={movie.plot}
            darkMode={props.darkMode}
            watchlist={true}
            removeFromWatchlist={props.removeFromWatchlist}
            reorderUp={props.reorderUp}
            reorderDown={props.reorderDown}
          />
        )
      })
    ) : (
      <div className="empty-watchlist-div">
        <h3>Your watchlist is looking a little empty...</h3>
        <div className="empty-add-div" onClick={props.toggleWatchlist}>
          <i className="fa-solid fa-circle-plus"></i>
          <h5>Let's add some movies!</h5>
        </div>
      </div>
    )

  // const emptyWatchlist = (

  // )

  return <div id="page-container">{movieCards}</div>
}

// {
//   props.myWatchlist.length > 0 ? movieCards : emptyWatchlist
// }
