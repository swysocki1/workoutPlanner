import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalModalComponent} from "./calModal.component";
import { DateModule } from './date/date.module';



@NgModule({
  declarations: [
    CalModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DateModule
  
  ],
  exports: [
    CalModalComponent
  ],
  providers: []
})
export class CalModalModule { }
