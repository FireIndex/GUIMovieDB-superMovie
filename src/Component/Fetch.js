import { useState, useEffect } from 'react'

// setting the api link
const API_KEY = process.env.REACT_APP_THEMOVIEDB_API_KEY
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
const MOVIE_URL = `https://api.themoviedb.org/3/movie`

const Fetch = (type, apiParams) => {
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState(null)
  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [credits, setCredits] = useState(null)
  // const [var_singlemovie, setVar_singlemovie] = useState(null)

  const getCredentials = async (url, type) => {
    setIsLoading(true)
    try {
      const res = await fetch(url)
      const data = await res.json()

      console.log(data)
      // console.log('Request')

      setIsLoading(false)
      if (type === 'search' || type === 'movie') {
        if (data.success === undefined) {
          if (data.results) {
            setMovies(data.results || data)
          } else {
            setMovie(data)
          }
        } else {
          setMovies([])
        }
      } else if (type === 'trailer' || type === 'credits') {
        if (data.success === undefined) {
          if (data.results) {
            setTrailer(data.results || data)
          } else {
            setCredits(data)
          }
        } else {
          setTrailer([])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // debouncing in react js
  useEffect(() => {
    let timeOut
    if (type === 'search') {
      // FETCHING LIST OF MOVIES (Fetch('search', query))

      if (apiParams !== '') {
        timeOut = setTimeout(() => {
          getCredentials(
            `${API_URL}&language=en-US&page=1&include_adult=false&query=${apiParams}`,
            type
          )
        }, 1000)
      } else {
        setMovies([])
      }
    } else if (type === 'movie') {
      // FETCHING SINGLE OF MOVIE DETAILS (Fetch('movie', id))

      timeOut = setTimeout(() => {
        getCredentials(`${MOVIE_URL}/${apiParams}?api_key=${API_KEY}`, type)
      }, 1000)
    } else if (type === 'trailer') {
      // FETCHING SINGLE OF MOVIE DETAILS (Fetch('trailer', id))

      timeOut = setTimeout(() => {
        getCredentials(
          `${MOVIE_URL}/${apiParams}/videos?api_key=${API_KEY}&language=en-US`,
          type
        )
      }, 1000)
    } else if (type === 'credits') {
      // FETCHING SINGLE OF MOVIE DETAILS (Fetch('credits', id))

      timeOut = setTimeout(() => {
        getCredentials(
          `${MOVIE_URL}/${apiParams}/credits?api_key=${API_KEY}&language=en-US`,
          type
        )
      }, 1000)
    }

    console.log('set')
    return () => {
      clearTimeout(timeOut)
      console.log('clear')
    }
  }, [type, apiParams])

  return { isLoading, movies, movie, trailer, credits }
}

export default Fetch
