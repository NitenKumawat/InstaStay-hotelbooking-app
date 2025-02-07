import React, { createContext, useState, useContext } from 'react';

// Create a Context for search term
const SearchContext = createContext();

// Create a custom hook to use search context
export const useSearch = () => {
  return useContext(SearchContext);
};

// Create a provider for the search context
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
