import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarDay} from '../calendar.model';
import {Workout} from '../../workout/workout.model';
declare var $: any;

@Component({
  selector: 'calendar-day',
  templateUrl: './day.html',
  styles: [`
    .day {
      opacity: .25;
      height: 0;
      padding-bottom: 100%;
    }
    .day.valid-month {
      opacity: 1;
    }
    .workout {
      margin: 5px;
    }
    .breakfast, .lunch, .dinner, .snack { }
  `]
})
export class DayComponent {
  @Input() day: CalendarDay;
  @Input() workouts: Array<Workout>;
  @Output() showWorkout: EventEmitter<Workout> = new EventEmitter<Workout>();
  @Output() hideWorkout: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  hideWorkoutModal() {
    // this.modal.hide();
    this.hideWorkout.emit(true);
  }

  showWorkoutModal(workout: Workout) {
    this.showWorkout.emit(workout);
  }
  
  
}
