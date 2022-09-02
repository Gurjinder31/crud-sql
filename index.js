const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a movie
app.post('/movies', async (req, res) => {
  try {
    const { title, description, duration, rating, release_year } = req.body;
    const newMovies = await pool.query(
      'INSERT INTO public."Movie" ("title", "description", "duration", "rating", "release_year") VALUES($1, $2, $3, $4, $5);',
      [title, description, duration, rating, release_year]
    );
    res.json(newMovies.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all movies
app.get('/movies', async (req, res) => {
  try {
    const allMovies = await pool.query('SELECT * from public."Movie"');
    res.json(allMovies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a movie
app.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await pool.query(
      'SELECT * FROM public."Movie" WHERE id = $1',
      [id]
    );
    res.json(movie.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//search movies by typing keyword
app.get('/search', async (req, res) => {
  try {
    const title = req.query.title + '%';

    const searchMovies = await pool.query(
      'SELECT * from public."Movie" WHERE title like $1',
      [title]
    );
    res.json(searchMovies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a movie
app.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      likes,
      deslikes,
      duration,
      rating,
      release_year,
    } = req.body;
    const updateMovie = await pool.query(
      'UPDATE public."Movie" SET "title" = $2, "description" =  $3, "likes" = $4, "deslikes" = $5, "duration" = $6, "rating" = $7, "release_year" = $8 WHERE id = $1',
      [id, title, description, likes, deslikes, duration, rating, release_year]
    );

    res.json('Movie was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//delete a movie
app.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await pool.query(
      'DELETE FROM public."Movie" WHERE id = $1',
      [id]
    );
    res.json('Movie was deleted!');
  } catch (err) {
    console.log(err.message);
  }
});

// like and deslikes
app.put('/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;
    const updateMovie = await pool.query(
      'UPDATE public."Movie" SET "likes" = $1 WHERE id = $2',
      [likes, id]
    );

    res.json('Movie liked updated!');
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/deslike/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { deslikes } = req.body;
    const updateMovie = await pool.query(
      'UPDATE public."Movie" SET "deslikes" = $1 WHERE id = $2',
      [deslikes, id]
    );

    res.json('Movie desliked updated!');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(4001, () => {
  console.log('server has started on port 4001');
});
