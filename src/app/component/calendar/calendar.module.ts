import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CalendarComponent} from './calendar.component';
import {CalendarService} from './calendar.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DayComponent} from './day/day.component';
import {WorkoutModalModule} from "../workoutModal/workoutModal.module";
import { DayModule } from './day/day.module';


@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    WorkoutModalModule,
    DayModule
  ],
  exports: [
    CalendarComponent,
  ],
  providers: [CalendarService]
})
export class CalendarModule { }
