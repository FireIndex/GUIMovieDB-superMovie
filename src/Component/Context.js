import React, { useContext, useState } from 'react'
import Fetch from './Fetch'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [query, setQuery] = useState(' ')
  const { isLoading, movies } = Fetch('search', query)

  const [id, setId] = useState(496327)
  const { movie } = Fetch('movie', id)

  const { trailer } = Fetch('trailer', id)
  const { credits } = Fetch('credits', id)

  return (
    <AppContext.Provider
      value={{
        query,
        movies,
        setQuery,
        isLoading,
        id,
        setId,
        movie,
        trailer,
        credits,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }
