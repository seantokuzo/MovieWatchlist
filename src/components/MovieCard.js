import React from 'react'

export default function MovieCard(props) {
  const plotStyle = {
    color: props.darkMode ? 'var(--plot-dm)' : 'var(--plot-lm)',
  }

  return (
    <div className="movie-card-div">
      <img src={props.poster} alt="Movie Title"></img>
      <div className="card-non-img-div">
        <div className="card-title-div">
          <h2>{props.title}</h2>
          <i class="fa-solid fa-star"></i>
          <p>{props.rating}</p>
        </div>
        <div className="card-details-div">
          <p>{props.runtime}</p>
          <p>{props.genre}</p>
          <button>
            <i className="fa-solid fa-circle-plus"></i> Watchlist
          </button>
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
