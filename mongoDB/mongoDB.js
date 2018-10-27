const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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

exports.addWorkout = function addWorkout(workout, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').insertOne(workout, (err, res) => {
      funct(err, res.ops[0]);
      client.close();
    });
  });
};

exports.deleteWorkout = function deleteWorkout(workout, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').deleteOne({_id: ObjectId(workout._id)}, (err, res) => {
      funct(err, res);
      client.close();
    });
  });
};

exports.deleteExercise = function deleteWorkout(obj, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').updateOne({_id: ObjectId(obj.workoutId)}, {$pull: {exercises: {_id: ObjectId(obj.exerciseId)}}}, (err, res) => {
      funct(err, res);
      client.close();
    });
  });
};

exports.addExercise = function addExercise(obj, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    var exercise = obj.exercise;
    getCollection(client, 'workout').findOneAndUpdate({_id: ObjectId(obj.workoutId)}, {$push: {exercises: {_id: new ObjectId(), name: exercise.name, 
      description: exercise.description, reps: exercise.reps, sets: exercise.sets}}}, {returnOriginal: false}, (error, result) => {
      funct(error, result.value);
      client.close();
    });
  });
};

exports.getWorkout = function getWorkout(id, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').findOne({_id: ObjectId(id)}, (error, result) => {
      funct(error, result);
      client.close();
    });
  });
};
exports.getAllWorkoutsForUser = function getAllWorkoutsForUser(id, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').findOne({_id: id}, (error, result) => {
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
    getCollection(client, 'workout').update({_id: ObjectId(workout._id)}, {$set: {name: workout.name, description: workout.description, color: workout.color}}, (error, result) => {
      funct(error, result);
      client.close();
    });
  });
};

exports.updateExercise = function updateExercise(exercise, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').updateOne({'exercises._id': exercise._id}, 
      {$set: {'exercises.$.name': exercise.name, 'exercises.$.reps': exercise.reps, 
      'exercises.$.sets': exercise.sets, 'exercises.$.description': exercise.description}}, (err, res) => {
      funct(err, res);
      client.close();
    });
  });
};
