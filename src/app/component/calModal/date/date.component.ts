import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {CalendarDay, Day} from '../../calendar/calendar.model';
import {Workout} from '../../workout/workout.model';
import { WorkoutService } from '../../workout/workout.service';
import { LoginService } from '../../../../services/login.service';
import * as moment from 'moment';


@Component({
  moduleId: module.id,
  selector: 'date',
  templateUrl: './date.html',
  styles: [`
    .day {
      opacity: .25;
      height: 0;
      padding-bottom: 100%;
      cursor: pointer;
    }
    .selected-date {
      opacity: .25;
      height: 0;
      padding-bottom: 100%;
      cursor: pointer;
      color:red;
    }
    .day.valid-month {
      opacity: 1;
    }
    
  `]
})
export class DateComponent implements OnInit {
  @Input() day: CalendarDay;
  @Output() selectDate: EventEmitter<Day> = new EventEmitter<Day>();
  @Output() removeDate: EventEmitter<Day> = new EventEmitter<Day>();

  workouts: Array<Workout> = new Array<Workout>();

  constructor(private workoutService: WorkoutService, private loginService: LoginService) {}

  ngOnInit() {
    
  }

  
  select(day) {
    console.log(day);
    if (day.selected) {
      day['selected'] = false;
      document.getElementById(`date_${day.dayOfMonth}${day.month}`).style.color = 'black';
      this.removeDate.emit(day);
    }
    else {
      day['selected'] = true;
      document.getElementById(`date_${day.dayOfMonth}${day.month}`).style.color = 'red';
      this.selectDate.emit(day);
    }
    

  }
  
  
}
