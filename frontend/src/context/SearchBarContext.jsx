import React, { createContext, useContext, useState } from 'react'

const SearchBarContext = createContext()
export const SearchProvider = ({children}) => {
    const [showSearch,setShowSearch] = useState(false)
  return (
    <SearchBarContext.Provider value={{showSearch,setShowSearch}}>
        {children}
    </SearchBarContext.Provider>
  )
}

export const useSearch = ()=> useContext(SearchBarContext);
