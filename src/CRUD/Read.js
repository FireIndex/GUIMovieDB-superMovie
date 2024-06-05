import { useState, useEffect } from 'react'
import { useGlobalContext } from '../Component/Context'
import { dbDocs } from '../firebase.utils.js'

// Getting movie id from themoviedb and from same id get data from firebase to see store data.
function Read() {
  const { isLoading, movie } = useGlobalContext()

  let alreadyStore = false
  const [data, setData] = useState({
    poster_path: 'null', // string
    backdrop_path: 'null', // string
    title: 'null', // string
    id: 'null',
    original_title: 'null',
    genres: [],
    production_countries: [],
    runtime: 'null',
    release_date: 'null', // should be string b/z slice
    post_updated: 'null', // should be date
    overview: 'null',
    director: [],
    cast: [],
    trailer_key: '',
    download: [],
    docId: 'null',
  })

  if (!isLoading) {
    if (movie && dbDocs) {
      // assign value, which match key

      var currentId = movie.imdb_id ? movie.id + movie.imdb_id : `${movie.id}-m`
      dbDocs.map((curDoc) => {
        Object.keys(curDoc).map((docItem) => {
          if (curDoc['id'] === currentId) {
            alreadyStore = true
            data[docItem] = curDoc[docItem]
          }
        })
      })
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

  if (alreadyStore) {
    return (
      <>
        <li>
          <h2>Overview</h2>
        </li>
        <li>
          <span>document Id</span> <span>{data.docId}</span>
        </li>
        <li>
          <span>id</span> <span>{data.id}</span>
        </li>
        <li>
          <span>original title</span> <span>{data.original_title}</span>
        </li>
        <li>
          <span>title</span> <span>{data.title}</span>
        </li>
        <li>
          <span>genre</span>{' '}
          <span>
            {data.genres.map((curItem) => {
              return <map key={curItem.name}>{curItem.name}, </map>
            })}
          </span>
        </li>
        <li>
          <span>country</span>{' '}
          <span>
            {data.production_countries.map((curItem) => {
              return <map key={curItem.name}>{curItem.name}, </map>
            })}
          </span>
        </li>
        <li>
          <span>runtime</span>{' '}
          <span>{data.runtime ? data.runtime + ' min' : ''}</span>
        </li>
        <li>
          <span>release date</span> <span>{data.release_date}</span>
        </li>
        <li>
          <span>post updated</span> <span>{data.post_updated}</span>
        </li>

        <li>
          <h2>Summary</h2>
        </li>
        <li>
          <span>director</span>{' '}
          <span>
            {data.director.map((curItem) => {
              return <map key={curItem.name}>{curItem.name}, </map>
            })}
          </span>
        </li>
        <li>
          <span>cast</span>{' '}
          <span>
            {data.cast.map((curItem) => {
              return <map key={curItem.name}>{curItem.name}, </map>
            })}
          </span>
        </li>
        <li>
          <span>overview</span> <span>{data.overview}</span>
        </li>

        <li>
          <h2>Connections</h2>
        </li>
        <li>
          <span>poster path</span> <span>{data.poster_path}</span>
        </li>
        <li>
          <span>backdrop path</span> <span>{data.backdrop_path}</span>
        </li>
        <li>
          <span>trailer key</span> <span>{data.trailer_key}</span>
        </li>
        {data.download.map((curDoc, index) => {
          return (
            <div key={index}>
              <h2>{index + 1}. Download</h2>
              <li>
                <span>File Name</span> <span>{curDoc['file_name']}</span>
              </li>
              <li>
                <span>Quality</span> <span>{curDoc['quality']}</span>
              </li>
              <li>
                <span>Size</span> <span>{curDoc['size']}</span>
              </li>
              <li>
                <span>Forward On First Page</span>{' '}
                <span>{curDoc['forward_on_first_page']}</span>
              </li>
              <li>
                <span>Final Downloading Page</span>{' '}
                <span>{curDoc['final_downloading_page']}</span>
              </li>
              <li>
                <span>Downloading Link</span>{' '}
                <span>{curDoc['downloading_link']}</span>
              </li>
            </div>
          )
        })}
      </>
    )
  } else {
    return <h3>No Data Store</h3>
  }
}

export default Read
