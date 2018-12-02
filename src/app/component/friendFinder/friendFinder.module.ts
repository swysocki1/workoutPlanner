import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {FriendFilterPipe, FriendFinderComponent} from "./friendFinder.component";
import {FriendBlkComponent} from "./friendBlk/friendBlk.component";


@NgModule({
  declarations: [
    FriendFinderComponent,
    FriendBlkComponent,
    FriendFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  exports: [
    FriendFinderComponent,
    FriendBlkComponent,
    FriendFilterPipe
  ]
})
export class FriendFinderModule { }
