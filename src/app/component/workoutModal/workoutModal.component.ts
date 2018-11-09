import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Workout} from "../workout/workout.model";
declare var $: any;

@Component({
  selector: 'workout-modal',
  templateUrl: './workoutModal.html'
})
export class WorkoutModalComponent {
  @Input() workout: Workout;
}
