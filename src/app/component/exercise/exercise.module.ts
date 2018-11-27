import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ExerciseComponent} from './exercise.component';
import { ExerciseService } from './exercise.service';
import {FormsModule} from "@angular/forms";
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    ExerciseComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  exports: [ExerciseComponent],
  providers: [ExerciseService]
})
export class ExerciseModule { }
