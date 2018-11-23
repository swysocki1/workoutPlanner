import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {CalendarDay, Day} from '../calendar.model';
import {Workout} from '../../workout/workout.model';
import { WorkoutService } from '../../workout/workout.service';
import { DayService } from './day.service';
import { LoginService } from '../../../../services/login.service';
import * as moment from 'moment';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'calendar-day',
  templateUrl: './day.html',
  styles: [`
    .day {
      opacity: .25;
      height: 0;
      padding-bottom: 100%;
      width: 100%;
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
export class DayComponent implements OnInit {
  @Input() day: CalendarDay;
  @Output() showWorkout: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateWorkouts: EventEmitter<any> = new EventEmitter<any>();

  workouts: Array<Workout> = new Array<Workout>();

  constructor(private workoutService: WorkoutService, private dayService: DayService, private loginService: LoginService) {}

  ngOnInit() {
    this.dayService.getWorkoutsForDay(this.loginService.getUser()._id, moment(this.day.date).format('LL')).subscribe(result => {
      let res: Array<Day>;
      res = result as [Day];
      res.forEach((r, idx, arr) => {
        this.workoutService.get(r.workout).subscribe(ws => {
          let w: Workout = ws as Workout;
          if (w) {
            w.cal = r._id;
            this.workouts.push(w);
          }
        });
      });
    });
  }

  showWorkoutModal(workout: Workout) {
    var obj = {workout: workout, day: workout.cal};
    this.showWorkout.emit(obj);
    this.updateWorkouts.emit(this.workouts);
  }
  
  
}
