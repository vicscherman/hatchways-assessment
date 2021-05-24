import React from 'react'

const SearchBar = ({ filterFunction, type}) => {
    return (
        <div className="name-search ui big icon input">
        <input
          className="name-search"
          onChange = {filterFunction}
          type="text"
          placeholder={`Search by ${type}`}
        />
        <i className="search icon"></i>
      </div>
      
     
    )
}

export default SearchBar