import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ExerciseComponent} from './exercise.component';
import { ExerciseService } from './exercise.service';

@NgModule({
  declarations: [
    ExerciseComponent,
    
  ],
  imports: [
    BrowserModule,
    
  ],
  exports: [ExerciseComponent],
  providers: [ExerciseService]
})
export class ExerciseModule { }
