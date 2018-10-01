import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ModalComponent} from './modal.component';
import {ModalService} from './modal.service';


@NgModule({
  declarations: [
    ModalComponent,
    ModalService
  ],
  imports: [
    BrowserModule,
   
  ],
  exports: [ModalComponent],
  providers: [ModalService]
})
export class ModalModule { }