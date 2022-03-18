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
          props.date,
          props.genre,
          props.plot,
          props.cardId,
          props.popularity
        )
      }
    >
      <i className="fa-solid fa-circle-plus"></i> Watchlist
    </div>
  )

  const reorderBtnStyle = {
    color: props.darkMode ? '#fff' : 'var(--plot-lm)',
  }

  const reorderButtons = (
    <div className="reorder-btn-div">
      <button
        className="reorder-btn"
        onClick={() => props.reorderUp(props.cardId)}
        style={reorderBtnStyle}
      >
        <i className="fa-solid fa-caret-up"></i>
      </button>
      <button
        className="reorder-btn"
        onClick={() => props.reorderDown(props.cardId)}
        style={reorderBtnStyle}
      >
        <i className="fa-solid fa-caret-down"></i>
      </button>
    </div>
  )

  return (
    <div className={'movie-card-div fade-in'}>
      <img src={props.poster} alt="Movie Poster"></img>
      <div className="card-non-img-div">
        <div className="card-title-div">
          <h2>{props.title ? props.title : 'Title not available'}</h2>
          <i className="fa-solid fa-star"></i>
          <p>{props.rating}</p>
        </div>
        <div className="card-details-div">
          <p>{props.date}</p>
          <p>{props.genre}</p>
          {addOrDeleteButton}
        </div>
        <div className="card-plot-div">
          <p style={plotStyle}>{props.plot}</p>
        </div>
      </div>
      {props.watchlist && reorderButtons}
    </div>
  )
}
