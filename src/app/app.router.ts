import {Routes} from "@angular/router";
import {HomeComponent} from "./containers/home/home.component";
import {AdminComponent} from "./containers/admin/admin.component";
import {AccountSignupComponent} from "./component/accountSignup/accountSignup.component";
import {WorkoutComponent} from "./component/workout/workout.component";



import {ProfileComponent} from "./component/profile/profile.component";
import {CalendarComponent} from "./component/calendar/calendar.component";
import {FriendFinderComponent} from "./component/friendFinder/friendFinder.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'signup', component: AccountSignupComponent },
  { path: 'workouts', component: WorkoutComponent },
  { path: 'workout/:id', component: WorkoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'calendar', component: CalendarComponent},
  { path: 'friendFinder', component: FriendFinderComponent},
  { path: '**', redirectTo: '/home' }
];
