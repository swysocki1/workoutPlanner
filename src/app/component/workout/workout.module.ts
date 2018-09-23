import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {WorkoutComponent} from './workout.component';
import { WorkoutService } from './workout.service';


@NgModule({
  declarations: [
    WorkoutComponent,
    
  ],
  imports: [
    BrowserModule,
    
  ],
  exports: [WorkoutComponent],
  providers: [WorkoutService]
})
export class WorkoutModule { }
