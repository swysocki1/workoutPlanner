import { Component } from '@angular/core';
import {WorkoutService} from './workout.service';
import {Workout} from './workout.model';
import {Exercise} from '../exercise/exercise.model';

@Component({
  moduleId: module.id,
  selector: 'workout',
  templateUrl: './workout.html'
})

export class WorkoutComponent { 
    workouts: Workout[];
    panel_expand = true;
    edit_delete = true;
    save_cancel = false;
    
    
    constructor(private workoutService:WorkoutService){
        this.workouts = this.workoutService.getWorkouts();
          
    }
    
    
}
