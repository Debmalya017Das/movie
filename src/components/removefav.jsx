import PropTypes from 'prop-types';

const RemoveFavourites = ({ onClick }) => {
	return (
	<span onClick={onClick} style={{ cursor: 'pointer' }}>
		<i className='fas fa-trash-alt text-danger' style={{ fontSize: '1.5rem' }}></i>
	</span>
	);
  };
  RemoveFavourites.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default RemoveFavourites;