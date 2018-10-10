import {Component, OnInit} from '@angular/core';
import {WorkoutService} from './workout.service';
import {Workout} from './workout.model';
import {Exercise} from '../exercise/exercise.model';

@Component({
  moduleId: module.id,
  selector: 'workout',
  templateUrl: './workout.html',
  styleUrls: ['../exercise/exercise.css', '../modal/modal.css']
})

export class WorkoutComponent implements OnInit {
    workouts: [Workout];
    
    
    
    constructor(private workoutService:WorkoutService) { }

    ngOnInit() {
      // this.workouts = this.workoutService.getWorkouts() as [Workout];
      this.workoutService.getAllWorkouts().subscribe(workouts => {
        this.workouts = workouts as [Workout];
      });
    }
    
    cancel(workout: Workout) {
        (<HTMLInputElement>document.getElementById(`w_name_${workout.id}`)).value = workout.name;
        (<HTMLInputElement>document.getElementById(`w_desc_${workout.id}`)).value = workout.description;

        document.getElementById(`w_save_cancel_${workout.id}`).className = 'hidden';
        document.getElementById(`w_edit_delete_${workout.id}`).className = 'show';

        document.getElementById(`w_label2_${workout.id}`).className = 'hidden';
        document.getElementById(`w_label1_${workout.id}`).className = 'hidden';

        (<HTMLInputElement>document.getElementById(`w_desc_${workout.id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`w_name_${workout.id}`)).disabled = true;

        document.getElementById(`w_desc_${workout.id}`).classList.add("exercise-text-input");
        document.getElementById(`w_name_${workout.id}`).classList.add("exercise-text-input", "text-white");
    }

    save(workout: Workout) {
        //w_save_cancel_' + workout.id}}
        document.getElementById(`w_save_cancel_${workout.id}`).className = 'hidden';
        document.getElementById(`w_edit_delete_${workout.id}`).className = 'show';

        document.getElementById(`w_label2_${workout.id}`).className = 'hidden';
        document.getElementById(`w_label1_${workout.id}`).className = 'hidden';

        (<HTMLInputElement>document.getElementById(`w_desc_${workout.id}`)).disabled = true;
        (<HTMLInputElement>document.getElementById(`w_name_${workout.id}`)).disabled = true;

        document.getElementById(`w_desc_${workout.id}`).classList.add("exercise-text-input");
        document.getElementById(`w_name_${workout.id}`).classList.add("exercise-text-input", "text-white");
    }

    edit(workout: Workout) {
        document.getElementById(`w_save_cancel_${workout.id}`).className = 'show';
        document.getElementById(`w_edit_delete_${workout.id}`).className = 'hidden';

        document.getElementById(`w_label2_${workout.id}`).className = 'show-inline';
        document.getElementById(`w_label1_${workout.id}`).className = 'show-inline';

        (<HTMLInputElement>document.getElementById(`w_desc_${workout.id}`)).disabled = false;
        (<HTMLInputElement>document.getElementById(`w_name_${workout.id}`)).disabled = false;

        document.getElementById(`w_desc_${workout.id}`).classList.remove("exercise-text-input");
        document.getElementById(`w_name_${workout.id}`).classList.remove("exercise-text-input", "text-white");
    }

    delete(workout: Workout) {
    
    }
    
    
}
