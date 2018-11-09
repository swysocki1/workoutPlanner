import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import { Workout } from './workout.model';
import { Exercise } from '../exercise/exercise.model';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user.model';



@Component({
  moduleId: module.id,
  selector: 'workout',
  templateUrl: './workout.html',
  styleUrls: ['../exercise/exercise.css', '../modal/modal.css']
})

export class WorkoutComponent implements OnInit {
  currentUser: User;
  workouts: Array<Workout> = [];
  constructor(private workoutService: WorkoutService, private loginService: LoginService) { }

  ngOnInit() {
    this.currentUser = this.loginService.getUser();

    // this.workouts = this.workoutService.getWorkouts() as [Workout];
    this.workoutService.getAllWorkouts(this.currentUser.id).subscribe(ws => {
      this.workouts = ws as [Workout];
      console.log("Total workouts: " + this.workouts.length);
    }, error => {
      console.error(error);
    });

  }
  /*
  updateColor(workout: Workout, event: any){
    workout.color = event.target.value;

    this.workoutService.update(workout).subscribe(result => {
      console.log(result);
    })
    
  }
  */

  updateColor(workout: Workout, color) {
    workout.color = color;
    this.workoutService.update(workout).subscribe(result => {
      console.log(result);
    })

  }

  add() {
    let w: Workout;
    w = new Workout();
    w.name = (<HTMLInputElement>document.getElementById('add_workout_name')).value;
    (<HTMLInputElement>document.getElementById('add_workout_name')).value = "Add New Workout...";
    w.description = "Workout Description";
    w.owner = "current_user";
    w.color = "#818181";
    w.owner = this.currentUser.id;
    var arr: Exercise[] = [];
    w.exercises = arr;
    if (!this.workouts) {
      this.workouts = new Array<Workout>();
    }
    this.workoutService.add(w).subscribe(workout => {
      this.workouts.push(workout as Workout);
    });
  }

  cancel(workout: Workout) {
    var idx = this.workouts.indexOf(workout);

    this.workoutService.get(workout._id).subscribe(res => {

      workout = res as Workout;
      (<HTMLElement>document.getElementById(`w_label_${workout._id}`)).innerHTML = workout.name;
      (<HTMLInputElement>document.getElementById(`w_name_${workout._id}`)).value = workout.name;
      (<HTMLInputElement>document.getElementById(`w_desc_${workout._id}`)).value = workout.description;
      console.log("cancelling ...");
    });
    


    document.getElementById(`w_save_cancel_${workout._id}`).className = 'hidden';
    document.getElementById(`w_edit_delete_${workout._id}`).className = 'show';

    document.getElementById(`w_label2_${workout._id}`).className = 'hidden';
    document.getElementById(`w_label1_${workout._id}`).className = 'hidden';

    document.getElementById(`w_color_${workout._id}`).className = 'hidden';

    (<HTMLInputElement>document.getElementById(`w_desc_${workout._id}`)).disabled = true;
    (<HTMLInputElement>document.getElementById(`w_name_${workout._id}`)).disabled = true;

    document.getElementById(`w_desc_${workout._id}`).classList.add("exercise-text-input");
    document.getElementById(`w_name_${workout._id}`).classList.add("exercise-text-input");
  }

  save(workout: Workout) {
    this.workoutService.update(workout).subscribe(result => {
      console.log("saved workout");
    })

    // changing ui
    document.getElementById(`w_save_cancel_${workout._id}`).className = 'hidden';
    document.getElementById(`w_edit_delete_${workout._id}`).className = 'show';

    document.getElementById(`w_label2_${workout._id}`).className = 'hidden';
    document.getElementById(`w_label1_${workout._id}`).className = 'hidden';

    (<HTMLInputElement>document.getElementById(`w_desc_${workout._id}`)).disabled = true;
    (<HTMLInputElement>document.getElementById(`w_name_${workout._id}`)).disabled = true;

    document.getElementById(`w_desc_${workout._id}`).classList.add("exercise-text-input");
    document.getElementById(`w_name_${workout._id}`).classList.add("exercise-text-input");

    document.getElementById(`w_color_${workout._id}`).className = 'hidden';
  }

  edit(workout: Workout) {
    document.getElementById(`w_save_cancel_${workout._id}`).className = 'show';
    document.getElementById(`w_color_${workout._id}`).className = 'show';
    document.getElementById(`w_edit_delete_${workout._id}`).className = 'hidden';

    document.getElementById(`w_label2_${workout._id}`).className = 'show-inline';
    document.getElementById(`w_label1_${workout._id}`).className = 'show-inline';

    (<HTMLInputElement>document.getElementById(`w_desc_${workout._id}`)).disabled = false;
    (<HTMLInputElement>document.getElementById(`w_name_${workout._id}`)).disabled = false;

    document.getElementById(`w_desc_${workout._id}`).classList.remove("exercise-text-input");
    document.getElementById(`w_name_${workout._id}`).classList.remove("exercise-text-input");
  }

  delete(workout: Workout) {
    this.workoutService.delete(workout).subscribe(result => {
      this.workouts.splice(this.workouts.indexOf(workout), 1);
      console.log("deleted workout...");
    })
  }

  clone(workout: Workout) {
    let w: Workout;
    w = new Workout();
    w.name = workout.name;
    w.owner = "current_owner";
    w.color = workout.color;
    w.description = workout.description;
    w.exercises = workout.exercises;
    this.workoutService.add(w).subscribe(workout => {
      this.workouts.push(workout as Workout);
      console.log("clones workout...");
    });
  }
}
