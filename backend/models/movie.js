import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  imdbID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: String },
  poster: { type: String }
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
