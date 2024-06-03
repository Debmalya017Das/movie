// import { useState } from 'react'
import PropTypes from 'prop-types'

const SearchBox = ({ searchValue, setSearchValue }) => {
  const handleChange = (event) => {
    setSearchValue(event.target.value); // Update the search value with the complete input
  };

  return (
    <form className='form-inline'>
      <input
        className='form-control mr-sm-2'
        type='search'
        placeholder='Search movies...'
        value={searchValue}
        onChange={handleChange} // Call handleChange function to update search value
      />
    </form>
  );
};




SearchBox.propTypes = {
	searchValue: PropTypes.string.isRequired,
	setSearchValue: PropTypes.func.isRequired,
};

export default SearchBox;