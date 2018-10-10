const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require("../mongoDB/mongoDB");
const helper = require("./expressHelper");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 4201;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const basepath = '/workout';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', (req, res) => {
  res.send('Success');
});
app.get(`${basepath}/getAll`, (req, res) => {
  mongoDB.getAllWorkouts((err, result) => {
    console.log(result);
    helper.respond(res, err, result);
  });
});
app.get(`${basepath}/getById/:id`, (req, res) => {
  mongoDB.getWorkout(req.params.id, (err, result) => {
    helper.respond(res, err, result);
  });
});
app.post(`${basepath}/update`, (req, res) => {
  mongoDB.updateWorkout(req.body, (err, result) => {
    helper.respond(res, err, result);
  });
});

