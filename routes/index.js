const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');

/* GET home page */
router.get('/', (req, res, next) => res.render('index', {title: 'Home'}));

// Route for the movies
router.get('/movies', async (req, res, next) => {
    const movies = await getMovies();
    res.render('movies', {title: 'Movies', movies})
});

//Route to display details from movie
router.get('/movies/:id', async (req, res) => {
    const id = req.params.id;
    const moviesFromDB = await Movie.findById(id);
    res.render('moviesInfo', {title: 'Movies Info', moviesFromDB});
});

//Function to get movies from mongodb
async function getMovies(){
    try {
        const movies = await Movie.find();
        return movies;
    } catch (error) {
        console.log(error);
        return [];
    };
};

module.exports = router;