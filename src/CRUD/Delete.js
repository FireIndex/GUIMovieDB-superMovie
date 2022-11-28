import { useState, useEffect } from 'react'
import { useGlobalContext } from '../Component/Context'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.utils.js'

function Delete() {
  const { isLoading, movie, trailer, credits } = useGlobalContext()

  {
    /* ========================= POST DATA TO DATABASE ========================= */
  }

  const [input, setInput] = useState()
  const postData = async (event) => {
    const docRef = doc(db, 'movies', input)
    deleteDoc(docRef).then(() => {
      alert('Delete Successfully : Refresh To See Changes')
    })
    setInput('')
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
      <input
        type='text'
        placeholder='Enter document id'
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      <button className='sumbit' onClick={postData} disabled={!input}>
        delete
      </button>
    </>
  )
}

export default Delete
