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
const authenticate = expressJwt({ secret: 'server secret' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const port = 4201;
const workoutPath = '/workout';
const exercisePath = '/exercise';
const calendarPath = '/calendar';
const userPath = '/user';
const notificationsPath = '/notifications';
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
    mongoDB.getAccount(req.user.username, function(err, user) {
        if (err) { return next(err); }
        // we store the updated information in req.user again
        req.user = user;
        next();
    });
}

function generateToken(req, res, next) {
  console.log(req.user);
    req.token = require('jsonwebtoken').sign({
        id: req.user._id,
    }, 'server secret', {
        expiresIn: '24h'
    });
    next();
}

app.get('/test', (req, res) => {
  res.send('Success');
});
// app.get(`${notificationsPath}/all`, authenticate, (req, res) => {
//   mongoDB.getAllNotifications((err, results) => {
//     helper.respond(res, err, results);
//   });
// });
app.post(`${notificationsPath}/getAllByUserId/:id`, authenticate, (req, res) => {
  mongoDB.getNotifications(req.params.id, (err, results) => {
    helper.respond(res, err, results);
  });
});
app.post(`${notificationsPath}/view`, authenticate, (req, res) => {
  mongoDB.viewNotification(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.post(`${notificationsPath}/create`, authenticate, (req, res) => {
  mongoDB.createNotification(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.post('/login', passport.authenticate(
    'local', {
        session: false
    }), serialize, generateToken, authRespond);
app.post('/createAccount', function(req, res) {
    console.log("post method engaged...");
    mongoDB.createAccount(req.body, function(err, result) {
        if (!err) {
          console.log('user created');
            mongoDB.getAccount(req.body.username, (getAccountErr, user) => {
              console.log(getAccountErr);
              console.log(user);
                helper.respond(res, getAccountErr, user);
            });
        } else {
            console.log('err creating account');
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
app.get(`${workoutPath}/getSharedWorkouts`, authenticate, (req, res) => {
    mongoDB.getSharedWorkouts(req.query.userId, (err, result) => {
        helper.respond(res, err, result);
    });
});
app.get(`${workoutPath}/getById/:id`, authenticate, (req, res) => {
    mongoDB.getWorkout(req.params.id, (err, result) => {
        helper.respond(res, err, result);
    });
});
app.get(`${userPath}/get/:id`, authenticate, (req, res) => {
    mongoDB.getUser(req.params.id, (err, result) => {
        helper.respond(res, err, result);
    });
});
app.get(`${userPath}/getAll`, authenticate, (req, res) => {
  mongoDB.getAllUsers(req.query, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.post(`${userPath}/befriendUser`, authenticate, (req, res) => {
  mongoDB.befriendUser(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.post(`${userPath}/unfriendUser`, authenticate, (req, res) => {
  mongoDB.unfriendUser(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.get(`${exercisePath}/get`, authenticate, (req, res) => {
    mongoDB.getExercise(req.query.id, (err, result) => {
        helper.respond(res, err, result);
    });
});
app.get(`${calendarPath}/getWorkouts`, authenticate, (req, res) => {
    mongoDB.getWorkoutsForDay(req.query.userId, req.query.date, (err, result) => {
        helper.respond(res, err, result);
    });
});

app.post(`${calendarPath}/addWorkout`, authenticate, (req, res) => {
    mongoDB.addWorkoutForDay(req.body, (err, result) => {
        helper.respond(res, err, result);
    });
});

app.get(`${workoutPath}/get`, authenticate, (req, res) => {
    mongoDB.getWorkout(req.query.id, (err, result) => {
        helper.respond(res, err, result);
    });
});
/*
app.get(`${userPath}/get`, authenticate, (req, res) => {
    mongoDB.getAccount(req.query.username, (err, result) => {
        helper.respond(res, err, result);
    });
});
*/
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

app.post(`${workoutPath}/share`, authenticate, (req, res) => {
    mongoDB.shareWorkout(req.body, (err, result) => {
        helper.respond(res, err, result);
    });
});

app.post(`${workoutPath}/unshare`, authenticate, (req, res) => {
    mongoDB.unshareWorkout(req.body, (err, result) => {
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

app.post(`${exercisePath}/updateWeight`, authenticate, (req, res) => {
    mongoDB.updateWeight(req.body, (err, result) => {
        helper.respond(res, err, result);
    });
});

app.post(`${exercisePath}/addWeight`, authenticate, (req, res) => {
    mongoDB.addWeight(req.body, (err, result) => {
        helper.respond(res, err, result);
    });
});

app.post(`${exercisePath}/delete`, authenticate, (req, res) => {
    mongoDB.deleteExercise(req.body, (err, result) => {
        helper.respond(res, err, result);
    });
});

app.post(`${calendarPath}/deleteWorkoutForDay`, authenticate, (req, res) => {
  mongoDB.deleteWorkoutForDay(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});

app.post(`${calendarPath}/deleteWorkoutFromCalendar`, authenticate, (req, res) => {
  mongoDB.deleteWorkoutFromCalendar(req.body, (err, result) => {
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
