import './index.css'

import NavBar from '../NavBar'

import Loader from 'react-loader-spinner'

import {useEffect, useState} from 'react'

const MovieDetailedView = props => {
  const [movieData, setMovieData] = useState([])
  const [castData, setCastData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {match} = props
  const {params} = match
  const {id} = params
  const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
  const fetchMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )
    const responseCast = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )
    const data = await response.json()
    const dataCast = await responseCast.json()
    // console.log(data)
    // console.log(dataCast)
    const updatedData = {
      backdropPath: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
      genres: data.genres,
      id: data.id,
      originalTitle: data.original_title,
      overview: data.overview,
      posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      releaseDate: data.release_date,
      title: data.title,
      voteAverage: data.vote_average,
      runtime: data.runtime,
    }
    const updatedCast = dataCast.cast.map(each => ({
      id: each.id,
      name: each.name,
      originalName: each.original_name,
      profilePath: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
      character: each.character,
    }))
    setMovieData(updatedData)
    setCastData(updatedCast)
    setIsLoading(false)
  }
  useEffect(() => {
    fetchMovie()
  }, [])
  const renderLoading = () => {
    return (
      <div className="loader-container">
        <Loader type="TailSpin" color="#032541" />
      </div>
    )
  }
  const renderMovie = () => {
    return (
      <>
        {movieData && (
          <>
            <div
              className="movie-detailed-container"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${posterPath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left',
                height: '100vh',
              }}
            >
              <div className="poster-image-content-container">
                <img className="poster-image" src={posterPath} />
              </div>
              <div className="poaster-path-container">
                <h1>{title}</h1>
                <p>{voteAverage} minutes</p>
                <p>{runtime}</p>
                <p>{gen}</p>
                <p>{releaseDate}</p>
                <p>{overview}</p>
              </div>
            </div>
            <h1>Cast</h1>
            <ul className="poster-content-container">
              {castData.map(cast => (
                <li key={cast.id} className="cast-list-item">
                  <img className="cast-image" src={cast.profilePath} />
                  <div className="cast-content-container">
                    <p className="cast-name">{cast.name}</p>
                    <p className="cast-head">{cast.character}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    )
  }
  const {
    posterPath,
    title,
    originalName,
    releaseDate,
    genres,
    voteAverage,
    overview,
    backdropPath,
    runtime,
  } = movieData
  let gen = genres && genres[0].name
  if (genres) {
    for (let i = 1; i <= genres.length - 1; i++) {
      gen += ', ' + genres[i].name
    }
  }
  // console.log(gen)
  return (
    <div>
      <NavBar />
      {isLoading ? renderLoading() : renderMovie()}
    </div>
  )
}
export default MovieDetailedView
