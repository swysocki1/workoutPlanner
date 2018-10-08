"use strict";
exports.__esModule = true;
var MongoClient = require('mongodb').MongoClient;
// replace the uri string with your connection string.
var uri = 'mongodb+srv://swysocki:workout!123@workoutplanner-gerei.mongodb.net/test?retryWrites=true';
MongoClient.connect(uri, function (err, client) {
    if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    }
    console.log('Connected...');
    var collection = client.db('test').collection('devices');
    // perform actions on the collection object
    client.close();
});
function getCollection(client, collection) {
    return client.db('test').collection(collection);
}
function getAllWorkouts(funct) {
    MongoClient.connect(uri, function (err, client) {
        if (err) {
            funct(err);
        }
        getCollection(client, 'workout').find({}).toArray(function (error, result) {
            funct(error, result);
            client.close();
        });
    });
}
exports.getAllWorkouts = getAllWorkouts;
function getWorkout(id, funct) {
    MongoClient.connect(uri, function (err, client) {
        if (err) {
            funct(err);
        }
        getCollection(client, 'workout').findOne({ id: id }, function (error, result) {
            funct(error, result);
            client.close();
        });
    });
}
exports.getWorkout = getWorkout;
function updateWorkout(workout, funct) {
    MongoClient.connect(uri, function (err, client) {
        if (err) {
            funct(err);
        }
        getCollection(client, 'workout').update({ id: workout.id }, { $set: workout }, function (error, result) {
            funct(error, result);
            client.close();
        });
    });
}
exports.updateWorkout = updateWorkout;
