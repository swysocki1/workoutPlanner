import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CalendarComponent} from './calendar.component';
import {CalendarService} from './calendar.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DayComponent} from './day/day.component';
import {WorkoutModalModule} from "../workoutModal/workoutModal.module";


@NgModule({
  declarations: [
    CalendarComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    WorkoutModalModule
  ],
  exports: [
    CalendarComponent,
    DayComponent
  ],
  providers: [CalendarService]
})
export class CalendarModule { }
