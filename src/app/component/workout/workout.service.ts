import {Injectable} from '@angular/core';
import {Workout} from './workout.model';
import {Exercise} from '../exercise/exercise.model';
import {ExternalRequestsService} from "../../../services/externalRequests.service";


@Injectable()
export class WorkoutService {
  constructor(private er: ExternalRequestsService) { }
  getWorkoutsForuser(userId) {

  }

  getWorkoutsForDay(userId, day) {

  }
  getAllWorkouts() {
    return this.er.getAllWorkouts();
  }
  getWorkouts(){
    let workouts: Workout[] = [];

    var a = new Exercise();

    a.id = "1";
    a.name = "Exer 1";
    a.reps = 14;
    a.sets = 5;

    var b = new Exercise();

    b.id = "2";
    b.name = "Exer 2";
    b.reps = 14;
    b.sets = 5;

    var c = new Exercise();

    c.id = "3";
    c.name = "Exer 3";
    c.reps = 14;
    c.sets = 5;
    c.description = "Description";

    var f = new Exercise();

    f.id = "4";
    f.name = "Exer 4";
    f.reps = 14;
    f.sets = 5;
    f.description = "Description"

    var g = new Exercise();

    g.id = "5";
    g.name = "Exer 5";
    g.reps = 14;
    g.sets = 5;
    g.description = "Description"

    var d = new Workout();
    d.id = "1";
    d.name = "Biceps!";
    d.description="Bicep workout"
    d.exercises = new Array<Exercise>();
    d.exercises.push(a, b, c);

    var e = new Workout();
    e.id = "2";
    e.name = "Triceps!";
    e.description="Tricep workout"
    e.exercises = new Array<Exercise>();
    e.exercises.push(a, b, c, f, g);
    
    workouts.push(d, e);

    return workouts;

  }
}
