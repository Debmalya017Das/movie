import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/Movielist';
import SearchBox from './components/searchbar';
import AddFavourites from './components/AddFav';
import RemoveFavourites from './components/removefav';
import Login from './components/login';
import Register from './components/register';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/favorites', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavourites(response.data);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
            }
        };

        if (token) {
            setIsAuthenticated(true);
            fetchFavorites();
        }
    }, [token]);

	// const logout = () => {
    //     setIsAuthenticated(false);
    //     setToken(null);
    //     localStorage.removeItem('token');
    // };
	
	// const addFavouriteMovie = async (movie) => {
	// 	try {
	// const response = await axios.post('http://localhost:5000/api/favorites', movie, {
	// 		headers: { Authorization: `Bearer ${token}` }
	// 	});
	// 	setFavourites([...favourites, response.data]);
	// 	} catch (error) {
	// 		console.error('Failed to add favorite:', error);
	// }
	// 	};		const removeFavouriteMovie = async (movie) => {
	// try {
	// 		await axios.delete(`http://localhost:5000/api/favorites/${movie.imdbID}`, {
	// 	headers: { Authorization: `Bearer ${token}` }
	// 		});
	// 		const newFavouriteList = favourites.filter(fav => fav.imdbID !== movie.imdbID);
	// 		setFavourites(newFavouriteList);
	// } catch (error) {
	// 		console.error('Failed to remove favorite:', error);
	// }
	// 	};
	
	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=73fd2243`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};



	const MovieApp = () => (
		<div className="container-fluid movie-app">
			{/* <div><button onClick={logout}>Logout</button>
                <MovieList
                    movies={movies}
                    handleFavouritesClick={addFavouriteMovie}
                    favouriteComponent={AddFavourites}
                    isFavourites={false}
                /></div> */}
			

		<div className='description-section mt-4 mb-4 text-light'>
		<p>As life is full of uncertainties, it`s only wise to save every penny you can. Cut your cord, cancel your subscription plan, watch movies for free online instead!</p>
		<p>It is not impossible! With the explosion of free online movie streaming sites, you now can spend hours watching movies without paying a single penny. And at Showboxmovies, you can watch them in HD, from any device available. As the site is mobile-friendly and Chromecast supported, you can watch movies of your choice on the go, with your smart phone, or on your sofa, with a big screen TV.</p>
		</div>

		<div className='row'>
      <div className='col'>
        <h2 className='text-light'>What`s hot?</h2>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-danger active'>Movies</button>
          {/* <button type='button' className='btn btn-outline-danger'>TV Shows</button> */}
        </div>
      </div>
    </div>
    <div className='row'>
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={AddFavourites}
        isFavourites={false}
      />
    </div>

    {favourites.length > 0 && (
      <>
        <div className='row mt-5'>
          <div className='col'>
            <h2 className='text-light'>My Favorites</h2>
          </div>
        </div>
        <div className='row'>
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
            isFavourites={true}
          />
        </div>
      </>
    )}
  </div>
	)

	return (

	<Router>
	<div>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" to="/">Moviehub</Link>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/login">Login</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/register">Register</Link>
						</li>
					</ul>
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				
               
			</div>
		</nav>
	</div>

	<Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setToken={setToken} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={isAuthenticated ? <MovieApp /> : <Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
);
};

export default App;