import {Injectable} from '@angular/core';
import {Workout} from './workout.model';
import {Exercise} from '../exercise/exercise.model';


@Injectable()
export class WorkoutService {

  getWorkouts(){

    let workouts: Workout[] = [];

    var a = new Exercise();

    a.id = "1";
    a.name = "Exer 1";
    a.reps = 14;
    a.sets = 5;

    var b = new Exercise();

    b.id = "1";
    b.name = "Exer 2";
    b.reps = 14;
    b.sets = 5;

    var c = new Exercise();

    c.id = "1";
    c.name = "Exer 2";
    c.reps = 14;
    c.sets = 5;
    c.description = "Description"

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
    e.exercises.push(a, b, c, a, b, c);
    
    workouts.push(d, e);

    return workouts;

  }
}
