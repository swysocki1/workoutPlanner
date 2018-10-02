import { Component, Input } from '@angular/core';
import {ExerciseService} from './exercise.service';
import {Exercise} from './exercise.model';
import { Workout } from '../workout/workout.model';

@Component({
  moduleId: module.id,
  selector: 'exercise',
  templateUrl: './exercise.html',
  styleUrls: ['./exercise.css', '../modal/modal.css']
})

export class ExerciseComponent { 
    @Input() exercises: Array<Exercise>;
    
    
    constructor(private excerciseService:ExerciseService){
        this.exercises = this.excerciseService.getExercises();
          
    }

    cancel(exercise: Exercise) {
        
        (<HTMLInputElement>document.getElementById(`e_name_${exercise.id}`)).value = exercise.name;
        (<HTMLInputElement>document.getElementById(`e_desc_${exercise.id}`)).value = !exercise.description? "": exercise.description;
        (<HTMLInputElement>document.getElementById(`e_reps_${exercise.id}`)).value = exercise.reps.toString();
        (<HTMLInputElement>document.getElementById(`e_sets_${exercise.id}`)).value = exercise.sets.toString();


        (<HTMLInputElement>document.getElementById(`e_name_${exercise.id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_desc_${exercise.id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_reps_${exercise.id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_sets_${exercise.id}`)).disabled = true;

        document.getElementById(`e_save_cancel_${exercise.id}`).className = 'hidden';
        document.getElementById(`e_edit_delete_${exercise.id}`).className = 'show';

        document.getElementById(`e_name_${exercise.id}`).classList.add("exercise-text-input");
        document.getElementById(`e_desc_${exercise.id}`).classList.add("exercise-text-input");
        document.getElementById(`e_reps_${exercise.id}`).classList.add("exercise-text-input");
        document.getElementById(`e_sets_${exercise.id}`).classList.add("exercise-text-input");
        
    }

    

    save(exercise: Exercise) {
        document.getElementById(`e_save_cancel_${exercise.id}`).className = 'hidden';
        document.getElementById(`e_edit_delete_${exercise.id}`).className = 'show';

        (<HTMLInputElement>document.getElementById(`e_name_${exercise.id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_desc_${exercise.id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_reps_${exercise.id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_sets_${exercise.id}`)).disabled = true;

        document.getElementById(`e_name_${exercise.id}`).classList.add("exercise-text-input");
        document.getElementById(`e_desc_${exercise.id}`).classList.add("exercise-text-input");
        document.getElementById(`e_reps_${exercise.id}`).classList.add("exercise-text-input");
        document.getElementById(`e_sets_${exercise.id}`).classList.add("exercise-text-input");
    }

    edit(exercise: Exercise) {
        document.getElementById(`e_save_cancel_${exercise.id}`).className = 'show';
        document.getElementById(`e_edit_delete_${exercise.id}`).className = 'hidden';

        (<HTMLInputElement>document.getElementById(`e_name_${exercise.id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_desc_${exercise.id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_reps_${exercise.id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_sets_${exercise.id}`)).disabled = false;

        document.getElementById(`e_name_${exercise.id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_desc_${exercise.id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_reps_${exercise.id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_sets_${exercise.id}`).classList.remove("exercise-text-input");
    }

    delete(exercise: Exercise) {
        
    }
    
}
