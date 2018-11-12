import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {DateComponent} from './date.component';


@NgModule({
  declarations: [DateComponent],
  imports: [BrowserModule, FormsModule],
  exports: [DateComponent],
  providers: []
})
export class DateModule { }
