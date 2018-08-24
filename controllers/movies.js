'use strict';

var Movies = require('../models/movies');


module.exports = function (router) {

    var model = new Movies();

    router.get('/', function (req, res) {

      Movies.find({}, function(err, movies){
              if(err){
                res.send(err);
              }
              var model = {
                movies: movies
              }

              res.render('movies', model);
            });

    });

    router.get('/add', function(req, res){
      res.render('addMovies');
    });

    router.post('/add', function(req , res){
      req.checkBody('title','Tirle is reqiured').notEmpty();

      var errors = req.validationErrors();

      if(errors){
        console.log('error');
      }else{
        var title = req.body.title && req.body.title.trim();
var release_date = req.body.release_date && req.body.release_date.trim();
var genre = req.body.genre && req.body.genre.trim();
var director = req.body.director && req.body.director.trim();
var plot = req.body.plot && req.body.plot.trim();
var trailer= req.body.trailer && req.body.trailer.trim();
var cover = req.body.cover && req.body.cover.trim();

var newMovie = new Movies({
  title: title,
  release_date: release_date,
  genre: genre,
  director: director,
  plot: plot,
  cover: cover,
  trailer: trailer
});

newMovie.save(function(err){
  if(err){
    res.send(err);
  }
  res.redirect('/movies');
});

      }
    });

    router.get('/details/:id', function(req,res){
      Movies.findOne({_id: req.params.id}, function(err, movie)
    {if(err){
      res.send(err);
    }
    res.render('details',{movie: movie});

    });
    })

};
