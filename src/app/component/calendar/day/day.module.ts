import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {DayComponent} from './day.component';
import {DayService} from './day.service';


@NgModule({
  declarations: [DayComponent],
  imports: [BrowserModule, FormsModule],
  exports: [DayComponent],
  providers: [DayService]
})
export class DayModule { }
