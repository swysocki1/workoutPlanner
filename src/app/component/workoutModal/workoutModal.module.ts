import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkoutModalComponent} from "./workoutModal.component";


@NgModule({
  declarations: [
    WorkoutModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    WorkoutModalComponent
  ],
  providers: []
})
export class WorkoutModalModule { }
