import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import * as moment from 'moment';

@Injectable()
export class ExerciseService {

  getExercises(){

    let exercises: Exercise[] = [];
   

    var a = new Exercise();

    a.id = "1";
    a.name = "Name";
    a.reps = 14;
    a.sets = 5;

    var b = new Exercise();

    b.id = "1";
    b.name = "Name";
    b.reps = 14;
    b.sets = 5;

    var c = new Exercise();

    c.id = "1";
    c.name = "Name";
    c.reps = 14;
    c.sets = 5;

    exercises.push(a, b, c);

    return exercises;

  }
}
