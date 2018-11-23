import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Workout} from "../workout/workout.model";
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from '../calendar/calendar.model';
import * as moment from 'moment';
import { ExternalRequestsService } from '../../../services/externalRequests.service';

@Component({
  selector: 'workout-modal',
  templateUrl: './workoutModal.html'
})
export class WorkoutModalComponent {
  @Input() workout: Workout;
  @Output() deleteWorkout: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private router: Router, private er: ExternalRequestsService){}

  view() {
    this.router.navigate(['workout', this.workout._id]);
  }

  delete() {
    var obj = {_id: this.workout.cal};

    this.er.deleteWorkoutForDay(obj).subscribe(result => {
      this.deleteWorkout.emit(this.workout);
    });
  }
}
