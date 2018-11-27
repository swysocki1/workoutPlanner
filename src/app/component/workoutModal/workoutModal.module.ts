import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkoutModalComponent} from "./workoutModal.component";
import { AngularFontAwesomeModule } from 'angular-font-awesome';



@NgModule({
  declarations: [
    WorkoutModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  exports: [
    WorkoutModalComponent
  ],
  providers: []
})
export class WorkoutModalModule { }
