/*eslint no-undef: "error"*/
/*global process*/
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './models/user.js';

import Movie from './models/movie.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.send({ token, username: user.username });
  } catch (error) {
    res.status(500).send(error);
  }
});

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

app.post('/api/favorites', authMiddleware, async (req, res) => {
  try {
    const { imdbID, title, year, poster } = req.body;
    let movie = await Movie.findOne({ imdbID });
    if (!movie) {
      movie = new Movie({ imdbID, title, year, poster });
      await movie.save();
    }
    if (!req.user.favorites.includes(movie._id)) {
      req.user.favorites.push(movie._id);
      await req.user.save();
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/favorites/:imdbID', authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findOne({ imdbID: req.params.imdbID });
    if (!movie) return res.status(404).send({ error: 'Movie not found' });
    req.user.favorites = req.user.favorites.filter(id => !id.equals(movie._id));
    await req.user.save();
    res.send({ message: 'Movie removed from favorites' });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/favorites', authMiddleware, async (req, res) => {
  try {
    await req.user.populate('favorites');
    res.send(req.user.favorites);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
