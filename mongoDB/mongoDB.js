const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const helper = require("../middleware/expressHelper");
// replace the uri string with your connection string.
const uri = 'mongodb+srv://swysocki:workout!123@workoutplanner-gerei.mongodb.net/test?retryWrites=true';

function getCollection(client, collection) {
    return client.db('test').collection(collection);
}

function connect(errorFunct, funct) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        if (err) {
          console.log(err);
            errorFunct(err);
        } else {
            funct(client);
        }
    });
}

exports.getAccount = function getAccount(username, funct) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            funct(err);
        }
        getCollection(client, 'users').findOne({ username: username }, (error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.getUser = function getUser(id, funct) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            funct(err);
        }
        getCollection(client, 'users').findOne({ _id: ObjectId(id) }, (error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.getAllUsers = function getAllUsers(params, funct) {
  connect(funct, (client) => {
    getCollection(client, 'users').find({}).toArray((error, result) => {
      result.forEach((user, index) => {
        delete result[index].password;
      });
      funct(error, result);
      client.close();
    });
  });
};

exports.befriendUser = function befriendUser(body, funct) {
  const currentUser = body.currentUser;
  const newFriend = body.newFriend;
  connect(uri, (client) => {
    getCollection(client, 'users').findOne({ _id: ObjectId(currentUser) }, (error, result) => {
      console.log(result);
      if (error) {
        funct(error);
        client.close();
      } else if (!result) {
        funct(new Error('CURRENT_USER_ID_NOT_FOUND'));
        client.close();
      } else if (result.friends && result.friends.length > 0 && result.friends.findIndex(friend => friend.id === newFriend) >= 0) {
        funct(new Error('USER_ALREADY_FRIEND'));
        client.close();
      } else {
        getCollection(client, 'users').updateOne({_id: ObjectId(currentUser)}, {$push : {friends : { id : newFriend}}}, (error, result) => {
          funct(error, result);
          client.close();
        });
      }
    });
  });
};

exports.unfriendUser = function unfriendUser(body, funct) {
  const currentUser = body.currentUser;
  const friend = body.friend;
  connect(uri, (client) => {
    getCollection(client, 'users').findOne({ _id: ObjectId(currentUser) }, (error, result) => {
      if (error) {
        funct(error);
        client.close();
      } else if (!result) {
        funct(new Error('CURRENT_USER_ID_NOT_FOUND'));
        client.close();
      } else if (result.friends && (result.friends.length <= 0 || result.friends.findIndex(f => f.id === friend) < 0)) {
        funct(new Error('USER_ALREADY_NOT_FRIEND'));
        client.close();
      } else {
        getCollection(client, 'users').updateOne({_id: ObjectId(currentUser)}, {$pull : {friends : { id: friend} } }, (error, result) => {
          funct(error, result);
          client.close();
        });
      }
    });
  });
};

exports.createAccount = function createAccount(user, funct) {
    console.log("creating account...");
    console.log(user.username + " " + user.password);
    this.getAccount(user.username, (error, result) => {

        if (error) {
            funct(error);
        } else if (result && result.username === user.username) {
            const err = new Error();
            err.message = 'USER_ALREADY_EXISTS';
            err.status = 400;
            funct(err);
        } else {
            if (user && !user._id) {
                user._id = new ObjectId(); // Create new ID since one does not exist!
            }
            connect(uri, (client) => {
              getCollection(client, 'users').updateOne({ _id: ObjectId(user._id) }, { $set: user }, { upsert: true }, (updateError, createResult) => {
                funct(updateError, createResult);
                client.close();
              });
            });
        }
    });
};

exports.updateAccount = function updateAccount(user, funct) {
    console.log("inside updateAccount...");
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            funct(err);
        }
        console.log(user._id);
        getCollection(client, 'users').replaceOne({ _id: ObjectId(user._id) }, { $set: user }, { upsert: true }, (error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.verifyPassword = function verifyPassword(user, password) {
    if (user) {
        if (user.password) {
            return user.password === password;
        } else {
            return true; // No password Login
        }
    } else {
        return false;
    }
};

exports.getAllNotifications = function getAllNotifications(funct) {
    connect(uri, (client) => {
        getCollection(client, 'notifications').find({}).toArray((error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.getNotifications = function getNotifications(user, funct) {
    connect(uri, (client) => {
        getCollection(client, 'notifications').find({ users: { $in: [`${user}`] } }).sort({ created: 1 }).toArray((error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.createNotification = function createNotification(notification, funct) {
    notification._id = new ObjectId();
    connect(uri, (client) => {
        getCollection(client, 'notifications').insertOne(notification, (error, result) => {
            funct(error, result.ops[0]);
            client.close();
        });
    });
};

exports.viewNotification = function viewNotification(body, funct) {
    connect(uri, (client) => {
        getCollection(client, 'notifications').update({ _id: body.notification }, { $push: { user: user, seen: new Date() } }, (error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.getAllWorkouts = function getAllWorkouts(userId, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }
        getCollection(client, 'workout').find({ 'owner': `${userId}` }).toArray((error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.getSharedWorkouts = function getSharedWorkouts(userId, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }
        getCollection(client, 'workout').find({ 'sharedWith.id': `${userId}` }).toArray((error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.getWorkoutsForDay = function getWorkoutsForDay(userId, date, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }
        getCollection(client, 'calendar').find({ 'user': `${userId}`, 'date': `${date}` }).toArray((error, result) => {
            funct(error, result);
            client.close();
        });
    });
};

exports.addWorkoutForDay = function addWorkoutForDay(obj, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }
        getCollection(client, 'calendar').insertOne({ 'user': `${obj.user}`, 'date': `${obj.date}`, 'workout': `${obj.workout}` }, (error, result) => {
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
        getCollection(client, 'workout').deleteOne({ _id: ObjectId(workout._id) }, (err, res) => {
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
        getCollection(client, 'workout').updateOne({ _id: ObjectId(obj.workoutId) }, { $pull: { exercises: { _id: ObjectId(obj.exerciseId) } } }, (err, res) => {
            funct(err, res);
            client.close();
        });
    });
};

exports.getExercise = function getExercise(id, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }
        getCollection(client, 'workout').findOne({ "exercises._id": ObjectId(id) }, (err, res) => {
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
        getCollection(client, 'workout').findOneAndUpdate({ _id: ObjectId(obj.workoutId) }, {
            $push: {
                exercises: {
                    _id: new ObjectId(),
                    name: exercise.name,
                    description: exercise.description,
                    reps: exercise.reps,
                    sets: exercise.sets,
                    weights: exercise.weights
                }
            }
        }, { returnOriginal: false }, (error, result) => {
            funct(error, result.value);
            client.close();
        });
    });
};

exports.unshareWorkout = function unshareWorkout(obj, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }
        var user = obj.user;
        getCollection(client, 'workout').updateOne({ _id: ObjectId(obj.workoutId) }, {
            $pull: {
                sharedWith: {
                    id: user.id,
                    username: user.username
                }
            }
        }, { returnOriginal: false }, (error, result) => {
            funct(error, result.value);
            client.close();
        });
    });
};

exports.shareWorkout = function shareWorkout(obj, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }
        var user = obj.user;
        getCollection(client, 'workout').updateOne({ _id: ObjectId(obj.workoutId) }, {
            $push: {
                sharedWith: {
                    _id: new ObjectId(),
                    id: user.id,
                    username: user.username
                }
            }
        }, { returnOriginal: false }, (error, result) => {
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
        getCollection(client, 'workout').findOne({ _id: ObjectId(id) }, (error, result) => {
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
        getCollection(client, 'workout').findOne({ _id: id }, (error, result) => {
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
        getCollection(client, 'workout').updateOne({ _id: ObjectId(workout._id) }, { $set: { name: workout.name, description: workout.description, color: workout.color } }, (error, result) => {
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
      getCollection(client, 'workout').findOneAndUpdate({ 'exercises._id': ObjectId(exercise._id) }, {
          $set: {
              'exercises.$.name': exercise.name,
              'exercises.$.reps': exercise.reps,
              'exercises.$.sets': exercise.sets,
              'exercises.$.description': exercise.description,
              'exercises.$.weights': exercise.weights
          }
      }, { returnOriginal: false }, (error, result) => {
        funct(error, result.value);
        client.close();
    });
  });
};

exports.addWeight = function addWeight(obj, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }

        getCollection(client, 'workout').findOneAndUpdate({ 'exercises._id': ObjectId(obj.exerciseId) }, {
            $push: {
                'exercises.$.weights': {
                    _id: new ObjectId(),
                    dayId: obj.dayId,
                    weight: obj.weight
                }
            }
        }, { returnOriginal: false }, (error, result) => {
            funct(error, result.value);
            client.close();
        });
    });
};


exports.updateWeight = function updateWeight(obj, funct) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            funct(err);
        }

        getCollection(client, 'workout').updateOne({ 'exercises.$.weights._id': ObjectId(obj.weightId) }, {
            $set: {
                'exercises.$.weights.$.weight': obj.weight
                }

        }, (err, res) => {
            funct(err, res);
            client.close();
        });
    });
};

exports.deleteWorkoutForDay = function deleteWorkoutForDay(obj, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'calendar').deleteOne({_id: ObjectId(obj._id)}, (err, res) => {
      funct(err, res);
      client.close();
    });
  });
};

exports.deleteWorkoutFromCalendar = function deleteWorkoutFromCalendar(obj, funct) {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      funct(err);
    }
    getCollection(client, 'calendar').deleteMany({workout: obj._id}, (err, res) => {
      funct(err, res);
      client.close();
    });
  });
};
