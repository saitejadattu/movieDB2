import {Link} from 'react-router-dom'

import './index.css'

import MovieDetailedView from '../MovieDetailedView'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card-container">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <div className="movie-content">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="mt-auto align-self-center">
        <button className="view-details-button" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
