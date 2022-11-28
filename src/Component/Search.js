import React from 'react'
import { useGlobalContext } from './Context'

const imgUrl = 'https://via.placeholder.com/200/200'

const Search = () => {
  const { id, setId } = useGlobalContext()
  const { query, setQuery } = useGlobalContext()
  const { movies, isLoading } = useGlobalContext()

  if (query == ' ') setQuery('')

  return (
    <>
      <form
        action='#'
        className='app-header-search'
        onSubmit={(e) => e.preventDefault()}
        autoComplete='off'
      >
        <input
          type='text'
          className='form-control'
          placeholder='Search superhit movie...'
          name='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type='submit' className='search-btn'>
          {/* <i className='fas fa-search'></i> */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='25'
            height='25'
            viewBox='0 0 45 25'
          >
            <linearGradient
              id='-2suTD81jP2ew0CFO8L6Qa_p8VkXMjDOpcE_gr1'
              x1='31.916'
              x2='25.088'
              y1='31.849'
              y2='26.05'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0' stopColor='#b2b2b2'></stop>
              <stop offset='.999'></stop>
            </linearGradient>
            <polygon
              fill='url(#-2suTD81jP2ew0CFO8L6Qa_p8VkXMjDOpcE_gr1)'
              points='29.976,27 24.451,27.176 33.95,36.778 36.778,33.95'
            ></polygon>
            <path
              fill='#b2b2b2'
              d='M24.313,27c-1.788,1.256-3.962,2-6.313,2c-6.075,0-11-4.925-11-11S11.925,7,18,7s11,4.925,11,11	c0,2.659-0.944,5.098-2.515,7h4.776C32.368,22.909,33,20.53,33,18c0-8.284-6.716-15-15-15S3,9.716,3,18c0,8.284,6.716,15,15,15	c4.903,0,9.243-2.363,11.98-6H24.313z'
            ></path>
          </svg>
        </button>

        <div className='search-list' id='search-list'>
          <section className='movie-page'>
            <div className='grid grid-4-col '>
              {movies
                ? movies.map((curElement) => {
                    const { id, title, poster_path } = curElement
                    const movieName = title.substring(0, 15)

                    return (
                      // <div to={`movie/${id}`} key={id}>
                      <div
                        key={id}
                        onClick={(e) => {
                          setId(id)
                          setQuery('')
                        }}
                      >
                        <div className='search-list-item'>
                          <img
                            src={
                              poster_path === null
                                ? imgUrl
                                : `https://image.tmdb.org/t/p/w500${poster_path}`
                            }
                            alt='#'
                          />
                          <p>
                            {movieName.length > 13
                              ? `${movieName}...`
                              : movieName}
                          </p>
                        </div>
                      </div>
                    )
                  })
                : ''}
            </div>
          </section>
        </div>
      </form>
    </>
  )
}

export default Search
