// Login.js
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = ({ setIsAuthenticated, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setToken(response.data.token);
      navigate('/app');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="card p-4 bg-light" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login to Showbox</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Login</button>
        </form>
        {/* <p className="text-center mt-3 text-muted">Demo: use "demo" as username and "password" as password.</p> */}
      </div>
    </div>
  );
};

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
  };

export default Login;