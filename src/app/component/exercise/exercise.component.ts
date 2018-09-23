import { Component, Input } from '@angular/core';
import {ExerciseService} from './exercise.service';
import {Exercise} from './exercise.model';
import { Workout } from '../workout/workout.model';

@Component({
  moduleId: module.id,
  selector: 'exercise',
  templateUrl: './exercise.html',
  styleUrls: ['./exercise.css']
})

export class ExerciseComponent { 
    @Input() exercises: Array<Exercise>;
    
    
    constructor(private excerciseService:ExerciseService){
        this.exercises = this.excerciseService.getExercises();
          
    }
    
}
