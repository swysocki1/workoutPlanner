import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Workout} from "../workout/workout.model";
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from '../calendar/calendar.model';
import * as moment from 'moment';
import { ExternalRequestsService } from '../../../services/externalRequests.service';
import { Exercise, Weight } from '../exercise/exercise.model';

@Component({
  selector: 'workout-modal',
  templateUrl: './workoutModal.html'
})
export class WorkoutModalComponent implements OnInit {
  @Input() workout: Workout;
  @Input() dayId: string;
  @Output() deleteWorkout: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private router: Router, private er: ExternalRequestsService){}

  ngOnInit() {
    //get weight for each exercise
  }


  view() {
    this.router.navigate(['workout', this.workout._id]);
  }

  delete() {
    var obj = {_id: this.workout.cal};

    this.er.deleteWorkoutForDay(obj).subscribe(result => {
      this.deleteWorkout.emit(this.workout);
    });
  }

  getWeight(exercise: Exercise) {
    var w = 0;
    exercise.weights.forEach(e => {
      if (e.dayId == this.dayId) {w = e.weight;}
    });
    return w;
  }

  updateWeight(exercise: Exercise) {
    let w: Weight;
    var found = false;
    var num = (<HTMLInputElement>document.getElementById(`e_w_${exercise._id}`)).value;
    
    exercise.weights.forEach(e => {
      if (e.dayId == this.dayId) {w = e; found = true;}
    });
    
    if (found) {
      w.weight = parseInt(num);
      this.er.updateExercise(exercise).subscribe(r => {});
    }
    else {
      var obj2 = {exerciseId: exercise._id, dayId: this.dayId, weight: num};
      this.er.addWeight(obj2).subscribe(workout => {
        this.workout = workout as Workout;
        this.workout.exercises.forEach(a => {
          if (a._id == exercise._id) {
            exercise = a;
          }
        });
      });
    }
  }
}
