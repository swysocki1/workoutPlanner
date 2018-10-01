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

    cancel(exercise: Exercise) {
        exercise.edit_delete = !exercise.edit_delete;
        (<HTMLInputElement>document.getElementById(`e_name_${exercise.id}`)).value = exercise.name;
        (<HTMLInputElement>document.getElementById(`e_desc_${exercise.id}`)).value = !exercise.description? "": exercise.description;
        (<HTMLInputElement>document.getElementById(`e_reps_${exercise.id}`)).value = exercise.reps.toString();
        (<HTMLInputElement>document.getElementById(`e_sets_${exercise.id}`)).value = exercise.sets.toString();
        
    }

    save(exercise: Exercise) {

    }

    delete(exercise: Exercise) {
        
    }
    
}
