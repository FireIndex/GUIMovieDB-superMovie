import { useState, useEffect } from 'react'
import { useGlobalContext } from '../Component/Context'
import { addDoc } from 'firebase/firestore'
import { colRef, dbDocs } from '../firebase.utils.js'

function Create() {
  const { isLoading, movie, trailer, credits } = useGlobalContext()
  let [alreadyStore, setAlreadyStore] = useState(false)

  var forward_on_first_page_link, final_downloading_page_link

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
  })

  if (!isLoading) {
    // IS MOVIE DATA ALREADY STORE?
    if (movie && dbDocs) {
      var currentId = movie.imdb_id ? movie.id + movie.imdb_id : `${movie.id}-m`
      dbDocs.map((curDoc) => {
        Object.keys(curDoc).map((docItem) => {
          if (curDoc['id'] === currentId) {
            // do not use setAlreadyStore other wise it will run infinite time
            // b/z when we use set it will run map again and the set value then map again
            // we can use in push data function
            alreadyStore = true
          }
        })
      })
    }

    if (movie) {
      // assign value, which match key
      Object.keys(data).map((data_cur) => {
        Object.keys(movie).map((movie_cur) => {
          if (data_cur === movie_cur) {
            data[data_cur] = movie[movie_cur]
          }
        })
      })

      // ALREADY STORE NOW JUST UPDATE OR MODIFY DATA FROM EXISTING DATA
      data.id = movie.imdb_id ? movie.id + movie.imdb_id : `${movie.id}-m`
      data.release_date = data.release_date ? data.release_date.slice(0, 4) : ''
      data.post_updated = new Date().toLocaleString()

      data.poster_path = data.poster_path
        ? 'https://image.tmdb.org/t/p/w500' + data.poster_path
        : 'https://via.placeholder.com/500/200'
      data.backdrop_path = data.backdrop_path
        ? 'https://image.tmdb.org/t/p/w500' + data.backdrop_path
        : 'https://via.placeholder.com/500/200'

      data.production_countries.map((cuitem) => {
        // Removing All special character
        cuitem['name'] = cuitem['name']
          .replaceAll(/[^a-zA-Z ]/g, '')
          .replaceAll(' ', '-')
      })

      // PASS NEW VARIABLE
      forward_on_first_page_link = movie.poster_path
        ? `${
            movie.poster_path.length >= 5
              ? movie.poster_path.slice(1, movie.poster_path.length - 4)
              : data.id
          }${Math.floor(Math.random() * 100000)}`
        : `${data.id}${Math.floor(Math.random() * 100000)}`
      final_downloading_page_link = movie.backdrop_path
        ? `${
            movie.backdrop_path.length >= 5
              ? movie.backdrop_path.slice(1, movie.backdrop_path.length - 4)
              : data.id
          }${Math.floor(Math.random() * 100000)}`
        : `${data.id}${Math.floor(Math.random() * 100000)}`
    } else {
      console.log('CREATE-- Movie data --CREATE')
    }

    if (trailer) {
      data.trailer_key = ''
      trailer.map((curItem) => {
        if (curItem.type === 'Trailer') {
          data.trailer_key = 'https://www.youtube.com/watch?v=' + curItem.key
        }
      })
    } else {
      console.log('CREATE-- trailer data --CREATE')
    }

    // I am using temp variable because, agar easa nahi kara tho useeffect jo background mein fetch kr raha hai vo dubera read karva daga esa jiski whaja sa data again push ho jaiga. jiski whaja sa eak naam eak sa jada war dikhiga
    if (credits) {
      var temp_store = []

      credits.cast.map((curItem) => {
        temp_store.push({ id: curItem.id, name: curItem.name })
      })
      data.cast = temp_store
      temp_store = []

      credits.crew.map((curItem) => {
        if (curItem.department === 'Directing') {
          temp_store.push({ id: curItem.id, name: curItem.name })
        }
      })
      data.director = temp_store
      temp_store = []
    } else {
      console.log('CREATE-- credits data --CREATE')
    }
  }

  {
    /* =========================== C-R-U-D Download =========================== */
  }
  const [downDict, setDownDict] = useState({
    file_name: '',
    quality: '',
    size: '',
    forward_on_first_page: '',
    final_downloading_page: '',
    downloading_link: '',
  })

  const getDownData = (e) => {
    // get input value from input field and store
    let name, value
    name = e.target.name
    value = e.target.value

    setDownDict({ ...downDict, [name]: value })
  }

  const pushDownData = () => {
    downDict.forward_on_first_page = forward_on_first_page_link
    downDict.final_downloading_page = final_downloading_page_link
    // insert downDict to data.download
    data.download.push(downDict)
    // alert('attach successfully ')
    setDownDict({
      file_name: '',
      quality: '',
      size: '',
      forward_on_first_page: '',
      final_downloading_page: '',
      downloading_link: '',
    })
  }

  const delDownData = (e) => {
    // delet download array element using index id
    const index = Number(e.target.id)
    const temp_down = data.download

    if (index > -1) {
      temp_down.splice(index, 1) // only splice array when item is found. 2nd parameter means remove one item only
      setData({ ...data, download: temp_down })
      temp_down = []
    }
  }

  {
    /* ========================= POST DATA TO DATABASE ========================= */
  }
  const pushData = (e) => {
    e.preventDefault()
    addDoc(colRef, data).then(() => {
      alert('Data store successfully')
      setAlreadyStore(true)
    })
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
  if (!alreadyStore) {
    return (
      <>
        <div className='form_container'>
          <form className='start-form' method='POST'>
            <div className='form first'>
              <div className='Overview'>
                <span className='title'>Overview</span>

                <div className='fields'>
                  <div className='input-field'>
                    <label className='lable'>Movie ID</label>
                    <input
                      type='text'
                      name='name'
                      placeholder='Enter movie id'
                      value={data.id}
                      readOnly
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Orignal Title</label>
                    <input
                      type='text'
                      name='original_title'
                      placeholder='Enter your original title'
                      value={data.original_title}
                      readOnly
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Title</label>
                    <input
                      type='text'
                      name='title'
                      placeholder='Enter movie title'
                      value={data.title}
                      readOnly
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Genre</label>
                    <select required>
                      <option defaultValue>Various genre</option>
                      {data.genres.map((curItem) => {
                        return <option key={curItem.id}>{curItem.name}</option>
                      })}
                    </select>
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Country</label>
                    <select required>
                      <option defaultValue>Various country</option>
                      {data.production_countries.map((curItem) => {
                        return (
                          <option key={curItem.name}>{curItem.name}</option>
                        )
                      })}
                    </select>
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Runtime</label>
                    <input
                      type='number'
                      name='runtime'
                      placeholder='Enter runtime'
                      value={data.runtime}
                      autoComplete='off'
                      readOnly
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Release Date</label>
                    <input
                      type='text'
                      placeholder='Enter Release date'
                      value={data.release_date}
                      readOnly
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Today Date</label>
                    <input
                      type='text'
                      placeholder='Enter today date'
                      value={data.post_updated}
                      readOnly
                      autoComplete='off'
                    />
                  </div>
                </div>
              </div>

              <div className='Connection'>
                <span className='title'>Connection</span>

                <div className='fields'>
                  <div className='input-field'>
                    <label className='lable'>Poster Image</label>
                    <input
                      type='text'
                      placeholder='Enter image url'
                      value={data.poster_path}
                      readOnly
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Backdrop Image</label>
                    <input
                      type='text'
                      placeholder='Enter image url'
                      value={data.backdrop_path}
                      readOnly
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Trailer</label>
                    <input
                      type='text'
                      placeholder='Enter trailer url'
                      value={data.trailer_key}
                      readOnly
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Director</label>
                    <select required>
                      <option defaultValue>Various director</option>
                      {data.director.map((curItem) => {
                        return <option key={curItem.id}>{curItem.name}</option>
                      })}
                    </select>
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Cast</label>
                    <select required>
                      <option defaultValue>Various cast</option>
                      {data.cast.map((curItem) => {
                        return <option key={curItem.id}>{curItem.name}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className='Download'>
                {data.download.length !== 0
                  ? data.download.map((curItem, index) => {
                      return (
                        <div key={index}>
                          <span
                            className='title title-cursor'
                            id={index}
                            onClick={delDownData}
                          >
                            ➖ Download {index + 1}
                          </span>

                          <div className='fields'>
                            <div className='input-field'>
                              <label className='lable'>File Name</label>
                              <input
                                type='text'
                                placeholder='with (web, bluray, theater, etc.)'
                                name='file_name'
                                value={curItem.file_name}
                                readOnly
                                autoComplete='off'
                              />
                            </div>

                            <div className='input-field'>
                              <label className='lable'>Quality</label>
                              <input
                                type='text'
                                placeholder='(480P, 720P, 1080P, x256)'
                                name='quality'
                                value={curItem.quality}
                                readOnly
                                autoComplete='off'
                              />
                            </div>

                            <div className='input-field'>
                              <label className='lable'>Size</label>
                              <input
                                type='text'
                                placeholder='Enter file size in GB'
                                name='size'
                                value={curItem.size}
                                readOnly
                                autoComplete='off'
                              />
                            </div>

                            <div className='input-field'>
                              <label className='lable'>
                                Forward On First Page
                              </label>
                              <input
                                type='text'
                                placeholder='Enter first page url'
                                name='forward_on_first_page'
                                value={curItem.forward_on_first_page}
                                readOnly
                                autoComplete='off'
                              />
                            </div>

                            <div className='input-field'>
                              <label className='lable'>
                                Final Downloading Page
                              </label>
                              <input
                                type='text'
                                placeholder='Enter target page url'
                                name='final_downloading_page'
                                value={curItem.final_downloading_page}
                                readOnly
                                autoComplete='off'
                              />
                            </div>

                            <div className='input-field'>
                              <label className='lable'>Downloading Link</label>
                              <input
                                type='text'
                                placeholder='Downloading link'
                                name='downloading_link'
                                value={curItem.downloading_link}
                                readOnly
                                autoComplete='off'
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  : ''}
              </div>

              <div className='Push Download'>
                <span className='title title-cursor' onClick={pushDownData}>
                  ➕ Push
                </span>

                <div className='fields'>
                  <div className='input-field'>
                    <label className='lable'>File Name</label>
                    <input
                      type='text'
                      placeholder='with (web, bluray, theater, etc.)'
                      name='file_name'
                      value={downDict.file_name}
                      onChange={getDownData}
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Quality</label>
                    <input
                      type='text'
                      placeholder='(480P, 720P, 1080P, x256)'
                      name='quality'
                      value={downDict.quality}
                      onChange={getDownData}
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Size</label>
                    <input
                      type='text'
                      placeholder='Enter file size in GB'
                      name='size'
                      value={downDict.size}
                      onChange={getDownData}
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>
                      Forward On First Page (Locked)
                    </label>
                    <input
                      type='text'
                      placeholder='Enter first page url'
                      name='forward_on_first_page'
                      value={forward_on_first_page_link}
                      onChange={getDownData}
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>
                      Final Downloading Page (Locked)
                    </label>
                    <input
                      type='text'
                      placeholder='Enter target page url'
                      name='final_downloading_page'
                      value={final_downloading_page_link}
                      onChange={getDownData}
                      autoComplete='off'
                    />
                  </div>

                  <div className='input-field'>
                    <label className='lable'>Downloading Link</label>
                    <input
                      type='text'
                      placeholder='Downloading link'
                      name='downloading_link'
                      value={downDict.downloading_link}
                      onChange={getDownData}
                      autoComplete='off'
                    />
                  </div>
                </div>
                <h5
                  className='info-danger cursor-pointer'
                  onClick={pushDownData}
                >
                  - Don't forget to click ➕ icon
                </h5>
              </div>

              <div className='Text Area'>
                <span className='title'>Summary</span>

                <textarea
                  name='overview'
                  id=''
                  cols='30'
                  rows='10'
                  placeholder='Enter movie overview'
                  value={data.overview}
                  readOnly
                ></textarea>
              </div>

              <div className='buttons'>
                <button className='sumbit' onClick={pushData}>
                  <span className='btnText'>Push</span>
                  <i className='sumbit-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1em'
                      preserveAspectRatio='xMidYMid meet'
                      viewBox='0 0 24 18'
                    >
                      <path
                        fill='currentColor'
                        d='m20.17 9.23l-14-5.78a3 3 0 0 0-4 3.7L3.71 12l-1.58 4.85A3 3 0 0 0 2.94 20a3 3 0 0 0 2 .8a3 3 0 0 0 1.15-.23l14.05-5.78a3 3 0 0 0 0-5.54ZM5.36 18.7a1 1 0 0 1-1.06-.19a1 1 0 0 1-.27-1L5.49 13h13.73Zm.13-7.7L4 6.53a1 1 0 0 1 .27-1A1 1 0 0 1 5 5.22a1 1 0 0 1 .39.08L19.22 11Z'
                      />
                    </svg>
                  </i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  } else {
    return <h3>Data Is Already Store</h3>
  }
}

export default Create
