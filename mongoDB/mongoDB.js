const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = 'mongodb+srv://swysocki:workout!123@workoutplanner-gerei.mongodb.net/test?retryWrites=true';
function getCollection(client, collection) {
  return client.db('test').collection(collection);
}
exports.getAllWorkouts = function getAllWorkouts(funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').find({}).toArray((error, result) => {
      funct(error, result);
      client.close();
    });
  });
};
exports.getWorkout = function getWorkout(id, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').findOne({id: id}, (error, result) => {
      funct(error, result);
      client.close();
    });
  });
};
exports.updateWorkout = function updateWorkout(workout, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').update({id: workout.id}, {$set: workout}, (error, result) => {
      funct(error, result);
      client.close();
    });
  });
};
