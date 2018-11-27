import {Component, Input, OnInit, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {CalendarDay, CalendarMonth, Day} from '../calendar/calendar.model';
import {CalendarService} from '../calendar/calendar.service';
import * as moment from 'moment';
import {Meal, MealCalendar} from '../../../models/meal.module';
import {MealService} from '../../../services/meal.service';
import {WorkoutService} from '../workout/workout.service';
import { Workout } from '../workout/workout.model';
import { LoginService } from '../../../services/login.service';
import { DayService } from '../calendar/day/day.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
declare var $:any;

@Component({
  moduleId: module.id,
  selector: 'workout-cal-modal',
  templateUrl: './calModal.html',
  styles: [
    `
    .flat-btn {
      padding: 0;
      border: none;
      background: none;
    }

    .cal-modal {
      width: 350px;;
    }
    
  `
]
})
export class CalModalComponent implements OnInit {
  workouts: [Workout];
  daysOfWeek: [string] = [] as [string];
  monthsOfYear: [string] = [] as [string];
  month: CalendarMonth = new CalendarMonth();
  selectedDate = moment().toDate();
  days: Array<CalendarDay> = new Array<CalendarDay>();
  dayToRemove: CalendarDay;
  @Input() workout: Workout;


  /*

onstructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef) {
    }

    private sayHello() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(HelloWorldComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
  */
  constructor(private cs: CalendarService, private loginService: LoginService, private dayService: DayService) {

    this.daysOfWeek = this.cs.getDaysOfWeek();
    this.monthsOfYear = this.cs.getMonthsOfYear();
    this.month = this.cs.getMonth(moment(this.selectedDate).year(), moment(this.selectedDate).month());
    //this.getMealCalendar();

    // const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    // const ref = this.viewContainerRef.createComponent(factory);
    // ref.changeDetectorRef.detectChanges();
    //
    // this.modalComponent = ref.instance;
  }

  ngOnInit() {
    // this.workouts = this.workoutService.getWorkouts() as [Workout];
    /*
    this.workoutService.getAllWorkouts(this.loginService.getUser().id).subscribe(ws => {
      this.workouts = ws as [Workout];
      console.log(this.workouts.length + " **********");
    }, error => {
      console.error(error);
    });
    */
  }

  selectDate(day) {
    this.days.push(day);
    console.log('added day to list' + this.days.length);

  }

  removeDate(day) {
    this.dayToRemove = day;
    this.days = this.days.filter(
      (d) => {
        if (d.date === this.dayToRemove.date) {
          return false;
        }
        return true;
      }
    );
    console.log('removed day' + this.days.length);
  
  }
  
  toggleToday() {
  
  }

  reset() {
    this.month = this.cs.getMonth(moment(this.selectedDate).year(), moment(this.selectedDate).month());
    this.selectedDate = moment().toDate();
  }

  close() {
    $('#workout-cal-modal').modal('hide');
    this.days = new Array<CalendarDay>();
    this.reset();
    this.reset();
  }
  
  addToCalendar() {
    this.days.forEach(d => {
      var req = {
        date:moment(d.date).format('LL'),
        user:this.loginService.getUser()._id,
        workout: this.workout._id

      }

      this.dayService.addWorkoutForDay(req).subscribe(result => {
        console.log("added workouf for day");
      })
      
    });
    this.close();
  }
  goBackMonth() {
    this.selectedDate = moment(this.selectedDate).subtract(1, 'months').toDate();
    const year = moment(this.selectedDate).year();
    const month = moment(this.selectedDate).month();
    this.month = this.cs.getMonth(year, month);
  }
  goNextMonth() {
    this.selectedDate = moment(this.selectedDate).add(1, 'months').toDate();
    const year = moment(this.selectedDate).year();
    const month = moment(this.selectedDate).month();
    this.month = this.cs.getMonth(year, month);
  }
  
  
}
