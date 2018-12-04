import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import { Workout, Shared } from './workout.model';
import { Exercise } from '../exercise/exercise.model';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user.model';
import { ExerciseService } from '../exercise/exercise.service';
import * as moment from 'moment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

declare var $:any;


@Component({
  moduleId: module.id,
  selector: 'workout',
  templateUrl: './workout.html',
  styleUrls: ['../exercise/exercise.css', './workout.css']
})

export class WorkoutComponent implements OnInit {
  viewOnly: boolean;
  workout: Workout;
  workoutId: string;
  currentUser: User;
  friends: Array<User>;
  workouts: Array<Workout> = [];
  constructor(private workoutService: WorkoutService, private loginService: LoginService,
    private exerciseService: ExerciseService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.loginService.getUser();
    this.friends = this.loginService.getFriends();


    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.workoutId = params.get('id');
    });

    if (!this.workoutId && this.currentUser._id) {
      this.workoutService.getAllWorkouts(this.currentUser._id).subscribe(ws => {
        this.workouts = ws as [Workout];
        console.log("Total workouts: " + this.workouts.length);
        this.workoutService.getSharedWorkouts(this.currentUser._id).subscribe(result => {
          console.log("getting shared workouts ....");
          let w: Array<Workout> = result as [Workout];
          w.forEach(e => {
            e.isShared = true;
            this.workouts.push(e);
          });
        });
      }, error => {
        console.error(error);
      });
  
      
    }

    else {
      this.workoutService.get(this.workoutId).subscribe(result => {
        let w: Workout = result as Workout;
        let shared: boolean = false;
        w.sharedWith.forEach((e, i, a) => {
          if (e.id == this.currentUser._id) {
            w.isShared = true;
            shared = true;
          }
        })
        if (!shared) {
          this.viewOnly = true;
        }
        this.workouts = new Array<Workout>();
        this.workouts.push(w);
      })
    }

  }

  viewUserProfile(user) {
    console.log(`/profile/${user}`);
    this.router.navigate([`/profile/${user}`]);
  }

  showShareModal(workout) {
    this.workout = workout;
    $('#workout-share-modal').modal('show');
  }

  showCalModal(workout) {
    this.workout = workout;
    $('#workout-cal-modal').modal('show');
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
    if (w.name === '') {
      alert('Provide a name for the workout');
      return;
    }
    (<HTMLInputElement>document.getElementById('add_workout_name')).value = "Add New Workout...";
    w.description = "Workout Description";
    w.color = "#37454E";
    w.owner = this.currentUser._id;
    
    var shared: Shared[] = [];
    w.sharedWith = shared;
    var exercises: Exercise[] = [];
    w.exercises = exercises;
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
    
    document.getElementById(`w_save_cancel_${workout._id}`).className = 'workout-hidden float-left';
    document.getElementById(`w_edit_delete_${workout._id}`).className = 'show float-left';

    document.getElementById(`w_label2_${workout._id}`).className = 'workout-hidden';
    document.getElementById(`w_label1_${workout._id}`).className = 'workout-hidden';

    document.getElementById(`w_color_${workout._id}`).className = 'workout-hidden';

    (<HTMLInputElement>document.getElementById(`w_desc_${workout._id}`)).disabled = true;
    (<HTMLInputElement>document.getElementById(`w_name_${workout._id}`)).disabled = true;

    document.getElementById(`w_desc_${workout._id}`).classList.add("exercise-text-input");
    document.getElementById(`w_name_${workout._id}`).classList.add("exercise-text-input");
  }

  save(workout: Workout) {
    this.workoutService.update(workout).subscribe(result => {
      console.log("saved workout");
    });

    // changing ui
    (<HTMLElement>document.getElementById(`w_label_${workout._id}`)).innerHTML = workout.name;
    document.getElementById(`w_save_cancel_${workout._id}`).className = 'workout-hidden float-left';
    document.getElementById(`w_edit_delete_${workout._id}`).className = 'show float-left';

    document.getElementById(`w_label2_${workout._id}`).className = 'workout-hidden';
    document.getElementById(`w_label1_${workout._id}`).className = 'workout-hidden';

    (<HTMLInputElement>document.getElementById(`w_desc_${workout._id}`)).disabled = true;
    (<HTMLInputElement>document.getElementById(`w_name_${workout._id}`)).disabled = true;

    document.getElementById(`w_desc_${workout._id}`).classList.add("exercise-text-input");
    document.getElementById(`w_name_${workout._id}`).classList.add("exercise-text-input");

    document.getElementById(`w_color_${workout._id}`).className = 'workout-hidden';
  }

  edit(workout: Workout) {
    document.getElementById(`w_save_cancel_${workout._id}`).className = 'show float-left';
    document.getElementById(`w_color_${workout._id}`).className = 'show';
    document.getElementById(`w_edit_delete_${workout._id}`).className = 'workout-hidden float-left';

    document.getElementById(`w_label2_${workout._id}`).className = 'workout-show-inline';
    document.getElementById(`w_label1_${workout._id}`).className = 'workout-show-inline';

    (<HTMLInputElement>document.getElementById(`w_desc_${workout._id}`)).disabled = false;
    (<HTMLInputElement>document.getElementById(`w_name_${workout._id}`)).disabled = false;

    document.getElementById(`w_desc_${workout._id}`).classList.remove("exercise-text-input");
    document.getElementById(`w_name_${workout._id}`).classList.remove("exercise-text-input");
  }

  delete(workout: Workout) {
    this.workoutService.delete(workout).subscribe(result => {
      
      this.workoutService.deleteWorkoutFromCalendar(workout).subscribe(res => {
      
      });
      this.workouts.splice(this.workouts.indexOf(workout), 1);
    })
  }

  clone(workout: Workout) {
    let w: Workout;
    w = new Workout();
    w.name = workout.name;
    w.color = workout.color;
    w.description = workout.description;
    w.exercises = workout.exercises;
    w.owner = this.currentUser._id;
    var shared: Shared[] = [];
    w.sharedWith = shared;
    var exercises: Exercise[] = [];
    w.exercises = exercises;
    this.workoutService.add(w).subscribe(result => {
      let res: Workout = result as Workout;
      //this.workouts.push(res);
      console.log("cloned workout...");
      // individually adding the exercises so they each have unique ids
      workout.exercises.forEach((e, idx, arr) => {
        var obj = {workoutId: res._id, exercise: {name: e.name, reps: e.reps, sets: e.sets, description: e.description, weights:[]}};
        this.exerciseService.add(obj).subscribe(x => {
          if (idx == arr.length - 1) {
            this.workouts.push(x as Workout);
          }
        });
      });
    });

    
  }
  refreshWorkout(workoutId: string) {
    this.workoutService.get(workoutId).subscribe((workout: Workout) => {
      this.workout = workout;
    });
  }
}
