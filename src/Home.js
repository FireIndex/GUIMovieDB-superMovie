import { useState, useEffect } from 'react'
import { useGlobalContext } from './Component/Context'
import Search from './Component/Search'
import Create from './CRUD/Create'
import Read from './CRUD/Read'
import Update from './CRUD/Update'
import Delete from './CRUD/Delete'

const imgUrl = 'https://via.placeholder.com/500/200'

const Home = () => {
  // Toggle state
  const [togglestate, setTogglestate] = useState(1)
  const { isLoading, movie } = useGlobalContext()

  let title = 'null'
  let poster_path = 'null'

  if (!isLoading) {
    if (movie) {
      title = movie.title
      poster_path = movie.poster_path
    } else {
      console.log('HOME-- movie data --HOME')
    }
  }

  if (isLoading) {
    return (
      <div className='loading-wrapper'>
        <section className='loding-section '>
          <div className='loading'>
            <div>
              <h2 className='text'>Loading...</h2>
              <h6 className='app-header-title'>
                Super<span>Movie.</span>
              </h6>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <>
      <div className='main-wrapper'>
        <div className='app'>
          {/* app header */}
          <div className='app-header'>
            <h2 className='app-header-title'>
              Super<span>Movie.</span>
            </h2>
            <Search />
          </div>
          {/* end of app header */}

          <div className='app-body'>
            <div className='app-body-content'>
              {/* app body thumbnail */}
              <div className='app-body-content-thumbnail'>
                <img
                  src={
                    poster_path === null
                      ? imgUrl
                      : `https://image.tmdb.org/t/p/w500${poster_path}`
                  }
                  alt='#'
                />
              </div>
              {/* end of app body thumbnail */}

              <div className='app-body-content-list'>
                <div className='name'>{title}</div>

                {/* tabs head */}
                <div className='app-body-tabs-head'>
                  <button
                    type='button'
                    className={
                      togglestate === 1
                        ? 'tab-head-single active-tab'
                        : 'tab-head-single'
                    }
                    onClick={() => setTogglestate(1)}
                  >
                    <span>CREATE</span>
                  </button>
                  <button
                    type='button'
                    className={
                      togglestate === 2
                        ? 'tab-head-single active-tab'
                        : 'tab-head-single'
                    }
                    onClick={() => setTogglestate(2)}
                  >
                    <span>READ</span>
                  </button>
                  <button
                    type='button'
                    className={
                      togglestate === 3
                        ? 'tab-head-single active-tab'
                        : 'tab-head-single'
                    }
                    onClick={() => setTogglestate(3)}
                  >
                    <span>UPDATE</span>
                  </button>
                  <button
                    type='button'
                    className={
                      togglestate === 4
                        ? 'tab-head-single active-tab'
                        : 'tab-head-single'
                    }
                    onClick={() => setTogglestate(4)}
                  >
                    <span>DELETE</span>
                  </button>
                </div>
                {/* end of tabs head */}

                {/* ======================= tabs body ======================= */}
                <div className='app-body-tabs-body'>
                  {/* --------------------- CREATE tab --------------------- */}
                  <div
                    className={
                      togglestate === 1
                        ? 'tab-body-single connections show-tab'
                        : 'tab-body-single connections'
                    }
                  >
                    <Create />
                  </div>
                  {/* --------------------- end of CREATE tab --------------------- */}

                  {/* --------------------- READ tab --------------------- */}
                  <ul
                    className={
                      togglestate === 2
                        ? 'tab-body-single biography show-tab'
                        : 'tab-body-single biography'
                    }
                  >
                    <Read />
                  </ul>
                  {/* --------------------- end of READ tab --------------------- */}

                  {/* --------------------- UPDATE --------------------- */}
                  <ul
                    className={
                      togglestate === 3
                        ? 'tab-body-single connections show-tab'
                        : 'tab-body-single connections'
                    }
                  >
                    <Update />
                  </ul>
                  {/* --------------------- end of UPDATE --------------------- */}

                  {/* --------------------- DELETE --------------------- */}
                  <ul
                    className={
                      togglestate === 4
                        ? 'tab-body-single connections show-tab'
                        : 'tab-body-single connections'
                    }
                  >
                    <Delete />
                  </ul>
                  {/* --------------------- end of DELETE --------------------- */}
                </div>
                {/* end of tabs body */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
