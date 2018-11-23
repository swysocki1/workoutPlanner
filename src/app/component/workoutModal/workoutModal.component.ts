import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Workout} from "../workout/workout.model";
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from '../calendar/calendar.model';
import * as moment from 'moment';
import { ExternalRequestsService } from '../../../services/externalRequests.service';
import { Exercise } from '../exercise/exercise.model';

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

  updateWeight(exerciseId) {
    var obj = {exerciseId: exerciseId, dayId: this.dayId, weight: 15};
    this.er.updateWeight(obj).subscribe(res => {console.log(res)});
  }
}
