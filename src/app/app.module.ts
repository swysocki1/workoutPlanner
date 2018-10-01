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
import {AccountSignupComponent} from "./component/accountSignup/accountSignup.component";
import {WorkoutComponent} from "./component/workout/workout.component";
import {ExerciseComponent} from "./component/exercise/exercise.component";
import {ExerciseService} from "./component/exercise/exercise.service";
import {WorkoutService} from "./component/workout/workout.service";
import {ModalComponent} from "./component/modal/modal.component";
import {ModalService} from "./component/modal/modal.service";







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
    AccountSignupComponent,
    WorkoutComponent,
    ExerciseComponent,
    ModalComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    CalendarModule
  ],
  entryComponents: [
    ModalComponent
],
  providers: [
    LoginService,
    ValidationService,
    NavbarSearchService,
    NotificationService,
    HelperService,
    MealService,
    WorkoutService, 
    ExerciseService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
