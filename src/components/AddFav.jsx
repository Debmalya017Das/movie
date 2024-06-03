// AddFavourite.jsx
import './mlist.css'
// import React from 'react';
import PropTypes from 'prop-types';

const AddFavourites = ({ onClick }) => {
  return (
    <span onClick={onClick} style={{ cursor: 'pointer' }}>
      <i className='fas fa-heart text-danger' style={{ fontSize: '1.5rem' }}></i>
    </span>
  );
};
AddFavourites.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default AddFavourites;

// export default AddFavourite;
