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
    
    @Input() workout: Workout;
    

    constructor(private excerciseService:ExerciseService){  
    }

    add(exercise: Exercise) {
        
        let e: Exercise;
        e = new Exercise();
        e.name = (<HTMLInputElement>document.getElementById('add_exercise_name')).value;
        e.reps = 0;
        e.sets = 0;
        e.description = "description"
        var obj = {workoutId: this.workout._id, exercise: {name: e.name, reps: e.reps, sets: e.sets, description: e.description}};
        this.excerciseService.add(obj).subscribe(exercise => {
            this.workout.exercises.push(e);
            console.log("added exercise...");
            console.log(exercise);
        });
        (<HTMLInputElement>document.getElementById('add_exercise_name')).value = "Add Exercise...";
    }

    cancel(exercise: Exercise, idx) {
        
        (<HTMLInputElement>document.getElementById(`e_name_${idx}${this.workout._id}`)).value = exercise.name;
        (<HTMLInputElement>document.getElementById(`e_desc_${idx}${this.workout._id}`)).value = !exercise.description? "": exercise.description;
        (<HTMLInputElement>document.getElementById(`e_reps_${idx}${this.workout._id}`)).value = exercise.reps.toString();
        (<HTMLInputElement>document.getElementById(`e_sets_${idx}${this.workout._id}`)).value = exercise.sets.toString();


        (<HTMLInputElement>document.getElementById(`e_name_${idx}${this.workout._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_desc_${idx}${this.workout._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_reps_${idx}${this.workout._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_sets_${idx}${this.workout._id}`)).disabled = true;

        document.getElementById(`e_save_cancel_${idx}${this.workout._id}`).className = 'hidden';
        document.getElementById(`e_edit_delete_${idx}${this.workout._id}`).className = 'show';

        document.getElementById(`e_name_${idx}${this.workout._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_desc_${idx}${this.workout._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_reps_${idx}${this.workout._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_sets_${idx}${this.workout._id}`).classList.add("exercise-text-input");
        
    }

    

    save(exercise: Exercise, idx) {
        document.getElementById(`e_save_cancel_${idx}${this.workout._id}`).className = 'hidden';
        document.getElementById(`e_edit_delete_${idx}${this.workout._id}`).className = 'show';
        let e = this.workout.exercises[idx];

        e.name = (<HTMLInputElement>document.getElementById(`e_name_${idx}${this.workout._id}`)).value;
        e.description = (<HTMLInputElement>document.getElementById(`e_desc_${idx}${this.workout._id}`)).value;
        e.reps = parseInt((<HTMLInputElement>document.getElementById(`e_reps_${idx}${this.workout._id}`)).value);
        e.sets = parseInt((<HTMLInputElement>document.getElementById(`e_sets_${idx}${this.workout._id}`)).value);

        //updateExercisesForWorkout

        this.excerciseService.updateExercisesForWorkout(this.workout).subscribe(obj => {
            console.log("saved exercise...");
            
        });

        (<HTMLInputElement>document.getElementById(`e_name_${idx}${this.workout._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_desc_${idx}${this.workout._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_reps_${idx}${this.workout._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_sets_${idx}${this.workout._id}`)).disabled = true;

        document.getElementById(`e_name_${idx}${this.workout._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_desc_${idx}${this.workout._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_reps_${idx}${this.workout._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_sets_${idx}${this.workout._id}`).classList.add("exercise-text-input");
    }

    edit(idx) {
    
        document.getElementById(`e_save_cancel_${idx}${this.workout._id}`).className = 'show';
        document.getElementById(`e_edit_delete_${idx}${this.workout._id}`).className = 'hidden';

        

        (<HTMLInputElement>document.getElementById(`e_name_${idx}${this.workout._id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_desc_${idx}${this.workout._id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_reps_${idx}${this.workout._id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_sets_${idx}${this.workout._id}`)).disabled = false;

        document.getElementById(`e_name_${idx}${this.workout._id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_desc_${idx}${this.workout._id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_reps_${idx}${this.workout._id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_sets_${idx}${this.workout._id}`).classList.remove("exercise-text-input");
    }

    delete(idx) {
        this.workout.exercises.splice(idx, 1);
        this.excerciseService.updateExercisesForWorkout(this.workout).subscribe(obj => {
            console.log("removed exercise...");
            
        });
    }
    
}
