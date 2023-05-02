const express = require('express')
const router = express.Router()
const movie = require('../movies.json')
const Joi = require('joi')

router.get('/', (req, res) => {

   res.json(movie)
})
router.post('/movies', (req, res) => {
   let requestBody = req.body;
   const movieSchema = Joi.object({
      name: Joi.string().required().label("Movie name"),
      rating: Joi.number().min(1).max(10).required().label("Rating"),
      releaseDate: Joi.string().required().label("Release date"),
   });

   const result = movieSchema.validate(requestBody);
   if (result.error == null) {
      const newMovie = {
         id: movie.length + 1,
         name: req.body.name,
         rating: req.body.rating,
         releaseDate: req.body.releaseDate,

      };
      movie.push(newMovie);
      res.send('added movie successfully');
   } else {
      return res.status(400).send(result.error.details[0].message);
   }
});

module.exports = router