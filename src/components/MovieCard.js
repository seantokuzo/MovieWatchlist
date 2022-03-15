import React from 'react'

export default function MovieCard(props) {
  const plotStyle = {
    color: props.darkMode ? 'var(--plot-dm)' : 'var(--plot-lm)',
  }

  const buttonColor = {
    color: props.darkMode ? '#fff' : '#000',
  }

  const addOrDeleteButton = props.watchlist ? (
    <div
      className="btn"
      style={buttonColor}
      onClick={() => props.removeFromWatchlist(props.poster)}
    >
      <i className="fa-solid fa-circle-minus"></i> Remove
    </div>
  ) : (
    <div
      className="btn"
      style={buttonColor}
      onClick={() =>
        props.addToWatchlist(
          props.poster,
          props.title,
          props.rating,
          props.runtime,
          props.genre,
          props.plot
        )
      }
    >
      <i className="fa-solid fa-circle-plus"></i> Watchlist
    </div>
  )

  return (
    <div className={props.watchlist ? 'movie-card-div fade-in' : 'movie-card-div flip'}>
      <img src={props.poster} alt="Movie Poster"></img>
      <div className="card-non-img-div">
        <div className="card-title-div">
          <h2>{props.title ? props.title : 'Title not available'}</h2>
          <i className="fa-solid fa-star"></i>
          <p>{props.rating}</p>
        </div>
        <div className="card-details-div">
          <p>{props.runtime}</p>
          <p>{props.genre}</p>
          {addOrDeleteButton}
        </div>
        <div className="card-plot-div">
          <p style={plotStyle}>{props.plot}</p>
        </div>
      </div>
    </div>
  )
}

// Poster: "https://m.media-amazon.com/images/M/MV5BMGM4M2Q5N2MtNThkZS00NTc1LTk1NTItNWEyZjJjNDRmNDk5XkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_SX300.jpg"
// Title: "The Princess Bride"
// Type: "movie"
// Year: "1987"
// imdbID: "tt0093779"

// ;<button
//   style={buttonColor}
//   onClick={() => props.addToWatchlist(props.poster, props.title, props.rating, props.runtime, props.genre, props.plot)}
// >
//   <i className="fa-solid fa-circle-plus"></i> Watchlist
// </button>
