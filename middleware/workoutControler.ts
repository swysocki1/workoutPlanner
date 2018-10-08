const express = require('express');
const bodyParser = require('body-parser');
import {getAllWorkouts, getWorkout, updateWorkout} from '../mongoDB/mongoDB';
// const mongoDB = require('../mongoDB/mongoDB');
import {respond} from './expressHelper';
// const helper = require('./expressHelper');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 4201;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const basepath = '/workout';
app.get('/test', (req, res) => {
  res.send('Success');
});
app.get(`${basepath}/getAll`, (req, res) => {
  getAllWorkouts((err, result) => {
    console.log(result);
    respond(res, err, result);
  });
});
app.get(`${basepath}/getById/:id`, (req, res) => {
  getWorkout(req.params.id, (err, result) => {
    respond(res, err, result);
  });
});
app.post(`${basepath}/update`, (req, res) => {
  updateWorkout(req.body, (err, result) => {
    respond(res, err, result);
  });
});

