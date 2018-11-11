import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShareModalComponent} from "./shareModal.component";


@NgModule({
  declarations: [
    ShareModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ShareModalComponent
  ],
  providers: []
})
export class ShareModalModule { }
