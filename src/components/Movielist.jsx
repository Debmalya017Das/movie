// MovieList.jsx
// import React from 'react';
import PropTypes from 'prop-types';
import './mlist.css';

const MovieList = ({ movies, handleFavouritesClick, favouriteComponent, isFavourites }) => {
	const FavouriteComponent = favouriteComponent;
	return (
	<>
		{movies.map((movie) => (
			<div className='col-md-2 mb-3' key={movie.imdbID}>
			<div className='movie-poster position-relative'>
			<img src={movie.Poster} alt={movie.Title} className='img-fluid rounded' />
			<div className='overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center'>
				<FavouriteComponent onClick={() => handleFavouritesClick(movie)} />
			</div>
			<span className='badge badge-danger position-absolute top-0 start-0 m-2'>HD</span>
			{isFavourites ? (
				<button className='btn btn-sm btn-outline-light position-absolute bottom-0 end-0 m-2' onClick={() => handleFavouritesClick(movie)}>
			Remove
				</button>
			) : (
				<button className='btn btn-sm btn-outline-light position-absolute bottom-0 end-0 m-2' onClick={() => handleFavouritesClick(movie)}>
			<i className='far fa-heart'></i> Add
				</button>
			)}
			</div>
			<h6 className='text-light mt-2'>{movie.Title}</h6>
			<small className='text-muted'>{movie.Year} • Movie</small>
		</div>
		))}
  </>
	);
  };

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Poster: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
    //   Genre: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
      Actors: PropTypes.string, // Actors is now optional
    })
  ).isRequired,
  handleFavouritesClick: PropTypes.func.isRequired,
  favouriteComponent: PropTypes.elementType.isRequired,
  isFavourites: PropTypes
};

export default MovieList;
