import { Component } from '@angular/core';
import {WorkoutService} from './workout.service';
import {Workout} from './workout.model';
import {Exercise} from '../exercise/exercise.model';

@Component({
  moduleId: module.id,
  selector: 'workout',
  templateUrl: './workout.html',
  styleUrls: ['../exercise/exercise.css']
})

export class WorkoutComponent { 
    workouts: Workout[];
    
    
    
    constructor(private workoutService:WorkoutService){
        this.workouts = this.workoutService.getWorkouts();
          
    }
    
    
}
