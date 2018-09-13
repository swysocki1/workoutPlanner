import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './containers/home/home.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.router';
import {LoginService} from '../services/login.service';
import {ValidationService} from '../services/validation.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarSearchService} from './navbar/navbar-search.service';
import {AdminComponent} from './containers/admin/admin.component';
import {NotificationService} from '../services/notification.service';
import {HelperService} from '../services/helper.service';
import {CalendarModule} from "./component/calendar/calendar.module";
import {MealService} from "../services/meal.service";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    CalendarModule
  ],
  providers: [LoginService,
    ValidationService,
    NavbarSearchService,
    NotificationService,
    HelperService,
    MealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
