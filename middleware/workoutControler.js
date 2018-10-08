"use strict";
exports.__esModule = true;
var express = require('express');
var bodyParser = require('body-parser');
var mongoDB_1 = require("../mongoDB/mongoDB");
// const mongoDB = require('../mongoDB/mongoDB');
var expressHelper_1 = require("./expressHelper");
// const helper = require('./expressHelper');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = 4201;
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
var basepath = '/workout';
app.get('/test', function (req, res) {
    res.send('Success');
});
app.get(basepath + "/getAll", function (req, res) {
    mongoDB_1.getAllWorkouts(function (err, result) {
        console.log(result);
        expressHelper_1.respond(res, err, result);
    });
});
app.get(basepath + "/getById/:id", function (req, res) {
    mongoDB_1.getWorkout(req.params.id, function (err, result) {
        expressHelper_1.respond(res, err, result);
    });
});
app.post(basepath + "/update", function (req, res) {
    mongoDB_1.updateWorkout(req.body, function (err, result) {
        expressHelper_1.respond(res, err, result);
    });
});
