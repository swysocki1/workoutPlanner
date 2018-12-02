import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

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
import {ExternalRequestsService} from "../services/externalRequests.service";
import {UserService} from "../services/user.service";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './component/profile/profile.component';
import {ExerciseModule} from "./component/exercise/exercise.module";
import {WorkoutModule} from "./component/workout/workout.module";
import {WorkoutModalModule} from "./component/workoutModal/workoutModal.module";
import {FriendFinderModule} from "./component/friendFinder/friendFinder.module";




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
    AccountSignupComponent,
    ProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    CalendarModule,
    ExerciseModule,
    WorkoutModule,
    HttpClientModule,
    WorkoutModalModule,
    AngularFontAwesomeModule,
    FriendFinderModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    LoginService,
    ValidationService,
    NavbarSearchService,
    NotificationService,
    HelperService,
    MealService,
    WorkoutService,
    ExerciseService,
    ExternalRequestsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
