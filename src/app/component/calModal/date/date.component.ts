import {Component, EventEmitter, Input, Output, OnInit, AfterViewInit} from '@angular/core';
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
export class DateComponent implements OnInit, AfterViewInit{
  @Input() day: CalendarDay;
  @Output() selectDate: EventEmitter<Day> = new EventEmitter<Day>();
  @Output() removeDate: EventEmitter<Day> = new EventEmitter<Day>();

  workouts: Array<Workout> = new Array<Workout>();
  today: boolean;

  constructor(private workoutService: WorkoutService, private loginService: LoginService) {}

  ngOnInit() {
    if (moment().format('LL') === moment(this.day.date).format('LL')) {
      this.today = true;
    }
    else {
      this.today = false;
    }

    
  }
  ngAfterViewInit() {
    document.getElementById(`date_${this.day.dayOfMonth}${this.day.month}`).style.color = this.getColor();
  }

  getColor() {
    if (this.today) {
      return 'blue';
    }
    else {
      return 'black'
    }
  }

  select(day) {
    if (day.selected) {
      day['selected'] = false;
      document.getElementById(`date_${day.dayOfMonth}${day.month}`).style.color = this.getColor();
      this.removeDate.emit(day);
    }
    else {
      day['selected'] = true;
      document.getElementById(`date_${day.dayOfMonth}${day.month}`).style.color = 'red';
      this.selectDate.emit(day);
    }
    

  }
  
  
}
