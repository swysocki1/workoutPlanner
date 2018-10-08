const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = 'mongodb+srv://swysocki:workout!123@workoutplanner-gerei.mongodb.net/test?retryWrites=true'
MongoClient.connect(uri, function(err, client) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  }
  console.log('Connected...');
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});
function getCollection(client, collection) {
  return client.db('test').collection(collection);
}
export function getAllWorkouts(funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').find({}).toArray((error, result) => {
      funct(error, result);
      client.close();
    });
  });
}
export function getWorkout(id: string, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').findOne({id: id}, (error, result) => {
      funct(error, result);
      client.close();
    });
  });
}
export function updateWorkout(workout, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'workout').update({id: workout.id}, {$set: workout}, (error, result) => {
      funct(error, result);
      client.close();
    });
  });
}
