import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { username, password,email});
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-dark">
    <div className="card p-4 bg-light" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Register to Showbox</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="email" className="form-label">email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-danger w-100">Register</button>
      </form>
      {/* <p className="text-center mt-3 text-muted"></p> */}
    </div>
  </div>
  );
};

export default Register;