import {Component, Input, OnInit, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {CalendarDay, CalendarMonth, Day} from './calendar.model';
import {CalendarService} from './calendar.service';
import * as moment from 'moment';
import {Meal, MealCalendar} from '../../../models/meal.module';
import {MealService} from '../../../services/meal.service';
import {WorkoutService} from '../workout/workout.service';
import { Workout } from '../workout/workout.model';
import { LoginService } from '../../../services/login.service';
declare var $:any;



@Component({
  moduleId: module.id,
  selector: 'calendar',
  templateUrl: './calendar.html'
})
export class CalendarComponent implements OnInit {
  workouts: [Workout];
  daysOfWeek: [string] = [] as [string];
  monthsOfYear: [string] = [] as [string];
  month: CalendarMonth = new CalendarMonth();
  selectedDate = moment().toDate();
  mealCalendar: [MealCalendar];
  workout: Workout;
  dayId: string;

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
  constructor(private cs: CalendarService, private mealService: MealService,
    private workoutService: WorkoutService, private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef, private loginService: LoginService) {

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
    this.workoutService.getAllWorkouts(this.loginService.getUser()._id).subscribe(ws => {\
      this.workouts = ws as [Workout];
    }, error => {
      console.error(error);
    });
    */
  }
  toggleToday() {
  
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
  
  
  updateWorkouts(workouts) {
    this.workouts = workouts;
  }

  deleteWorkoutForDay(workout) {
    this.workouts.splice(this.workouts.indexOf(workout), 1);
  }

  showWorkout(obj) {
    this.workout = obj.workout;
    this.dayId = obj.day;
    $('#workout-modal').modal('show');
  }
  
}
