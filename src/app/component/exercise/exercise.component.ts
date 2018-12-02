import { Component, Input, OnInit } from '@angular/core';
import {ExerciseService} from './exercise.service';
import {Exercise, Weight} from './exercise.model';
import { Workout } from '../workout/workout.model';
import { User } from '../../../models/user.model';
import { LoginService } from '../../../services/login.service';


@Component({
  moduleId: module.id,
  selector: 'exercise',
  templateUrl: './exercise.html',
  styleUrls: ['./exercise.css', '../workout/workout.css']
})

export class ExerciseComponent implements OnInit {
    @Input() workout: Workout;
    currentUser: User;
    newExerciseName: string = '';
    constructor(private excerciseService:ExerciseService, private loginService: LoginService){
    }

    ngOnInit() {
        this.currentUser = this.loginService.getUser();
    }

    add() {
        const e = new Exercise();
        e.name = this.newExerciseName;
        if(!e.name || !e.name.trim()) {
            alert('Provide a name for the exercise');
            return;
        }
        e.reps = 0;
        e.sets = 0;
        e.description = "description"
        e.weights = new Array<Weight>();
        var obj = {workoutId: this.workout._id, exercise: e};
        this.excerciseService.add(obj).subscribe(workout => {
            this.workout = workout as Workout;
            console.log("added exercise...");
        });
        this.newExerciseName = '';
    }

    cancel(exercise: Exercise) {
        var idx = this.workout.exercises.indexOf(exercise);
        this.excerciseService.get(exercise._id).subscribe(workout => {
            let w: Workout;
            w = workout as Workout;
            //console.log(w.exercises[idx]);

            let e: Exercise;
            e = w.exercises[idx] as Exercise;
            (<HTMLInputElement>document.getElementById(`e_name_${exercise._id}`)).value = e.name;
            (<HTMLInputElement>document.getElementById(`e_desc_${exercise._id}`)).value = e.description;
            (<HTMLInputElement>document.getElementById(`e_reps_${exercise._id}`)).value = e.reps.toString();
            (<HTMLInputElement>document.getElementById(`e_sets_${exercise._id}`)).value = e.sets.toString();
            console.log("cancelling ...");
        });
        
        (<HTMLInputElement>document.getElementById(`e_name_${exercise._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_desc_${exercise._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_reps_${exercise._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_sets_${exercise._id}`)).disabled = true;

        document.getElementById(`e_save_cancel_${exercise._id}`).className = 'workout-hidden';
        document.getElementById(`e_edit_delete_${exercise._id}`).className = 'show';

        document.getElementById(`e_name_${exercise._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_desc_${exercise._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_reps_${exercise._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_sets_${exercise._id}`).classList.add("exercise-text-input");
        
    }

    save(exercise: Exercise) {
        document.getElementById(`e_save_cancel_${exercise._id}`).className = 'workout-hidden';
        document.getElementById(`e_edit_delete_${exercise._id}`).className = 'show';
        
        this.excerciseService.update(exercise).subscribe(obj => {
            console.log("saved exercise...");
        });

        (<HTMLInputElement>document.getElementById(`e_name_${exercise._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_desc_${exercise._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_reps_${exercise._id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`e_sets_${exercise._id}`)).disabled = true;

        document.getElementById(`e_name_${exercise._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_desc_${exercise._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_reps_${exercise._id}`).classList.add("exercise-text-input");
        document.getElementById(`e_sets_${exercise._id}`).classList.add("exercise-text-input");
    }

    edit(exercise) {
    
        document.getElementById(`e_save_cancel_${exercise._id}`).className = 'show';
        document.getElementById(`e_edit_delete_${exercise._id}`).className = 'workout-hidden';

        (<HTMLInputElement>document.getElementById(`e_name_${exercise._id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_desc_${exercise._id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_reps_${exercise._id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`e_sets_${exercise._id}`)).disabled = false;

        document.getElementById(`e_name_${exercise._id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_desc_${exercise._id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_reps_${exercise._id}`).classList.remove("exercise-text-input");
        document.getElementById(`e_sets_${exercise._id}`).classList.remove("exercise-text-input");
    }

    delete(exercise: Exercise) {
        var obj = {workoutId: this.workout._id, exerciseId: exercise._id};
        this.excerciseService.delete(obj).subscribe(res => {
            this.workout.exercises.splice(this.workout.exercises.indexOf(exercise), 1);
            console.log("removed exercise...");
        });
    }
}
