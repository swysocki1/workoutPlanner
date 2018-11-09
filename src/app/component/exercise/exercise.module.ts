import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ExerciseComponent} from './exercise.component';
import { ExerciseService } from './exercise.service';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ExerciseComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [ExerciseComponent],
  providers: [ExerciseService]
})
export class ExerciseModule { }
