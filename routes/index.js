var express = require('express');
var router = express.Router();
const User = require('../models/user');

// GET /register
router.get('/register', (req, res, next) => {
  return res.render('register', {title: 'Register'})
})

// POST /register
router.post('/register', (req, res, next) => {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword) {

      // confirm passwords match
      if (req.body.password !== req.body.confirmPassword) {
        const err = new Error('Passwords do not match.')
        err.status = 400;
        return next(err);
      }

      // create object with form input
      let userData = {
        email: req.body.email,
        name: req.body.name,
        favoriteBook: req.body.favoriteBook,
        password: req.body.password
      };

      // use schema's 'create' method to insert document into Mongo
      User.create(userData, function(error, user) {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/profile')
        }
      })

    } else {
      const err = new Error('All fields are required');
      err.status = 400;
      return next(err);
    }
})

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
