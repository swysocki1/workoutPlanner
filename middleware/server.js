'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require("../mongoDB/mongoDB");
const helper = require("./expressHelper");
const passport = require("passport");
const Strategy = require('passport-local');
const url = require('url');
const app = express();
var cors = require('cors');
app.options('*', cors());
const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret : 'server secret'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const port = 4201;
const workoutPath = '/workout';
const exercisePath = '/exercise';
const calendarPath = '/calendar';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
  next();
});
passport.use(new Strategy(
  function(username, password, done) {
    mongoDB.getAccount(username, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!mongoDB.verifyPassword(user, password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
// module.exports = passport;


function authRespond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}
function serialize(req, res, next) {
  mongoDB.getAccount(req.user.username, function(err, user){
    if(err) {return next(err);}
    // we store the updated information in req.user again
    req.user = user;
    next();
  });
}
function generateToken(req, res, next) {
  req.token = require('jsonwebtoken').sign({
    id: req.user.id,
  }, 'server secret', {
    expiresIn: '24h'
  });
  next();
}

app.get('/test', function(req, res) {
  helper.respond(res, null, 'Success - Test Pass!');
});
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.post('/login', passport.authenticate(
  'local', {
    session: false
  }), serialize, generateToken, authRespond
);
app.post('/createAccount', function(req, res) {
  mongoDB.createAccount(req.body, function(err, result) {
    if (!err) {
      mongoDB.getAccount(req.body.username, (getAccountErr, user) => {
        helper.respond(res, getAccountErr, user);
      });
    } else {
      helper.respond(res, err, result);
    }
  });
});
app.post('/updateAccount', authenticate, function(req, res) {
  mongoDB.updateAccount(req.body, function(err, result) {
    if (!err) {
      mongoDB.getAccount(req.body.username, (err, user) => {
        helper.respond(res, err, user);
      });
    } else {
      helper.respond(res, err, result);
    }
  });
});
app.get('/test', (req, res) => {
  res.send('Success');
});
app.get(`${workoutPath}/getAll`, authenticate, (req, res) => {
  mongoDB.getAllWorkouts(req.query.userId, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.get(`${workoutPath}/getById/:id`, authenticate, (req, res) => {
  mongoDB.getWorkout(req.params.id, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.get(`${exercisePath}/get`, authenticate, (req, res) => {
  mongoDB.getExercise(req.query.id, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.get(`${calendarPath}/get`, authenticate, (req, res) => {
  mongoDB.getWorkoutsForDay(req.query.userId, req.query.date, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.get(`${workoutPath}/get`, authenticate, (req, res) => {
  mongoDB.getWorkout(req.query.id, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.post(`${workoutPath}/update`, authenticate, (req, res) => {
  mongoDB.updateWorkout(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.post(`${exercisePath}/update`, authenticate, (req, res) => {
  mongoDB.updateExercise(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});

app.post(`${workoutPath}/add`, authenticate, (req, res) => {
  mongoDB.addWorkout(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});

app.post(`${workoutPath}/delete`, authenticate, (req, res) => {
  mongoDB.deleteWorkout(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});

app.post(`${exercisePath}/add`, authenticate, (req, res) => {
  mongoDB.addExercise(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});

app.post(`${exercisePath}/delete`, authenticate, (req, res) => {
  mongoDB.deleteExercise(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   console.log(req);
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;
