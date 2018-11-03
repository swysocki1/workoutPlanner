import {Routes} from "@angular/router";
import {HomeComponent} from "./containers/home/home.component";
import {AdminComponent} from "./containers/admin/admin.component";
import {AccountSignupComponent} from "./component/accountSignup/accountSignup.component";
import {WorkoutComponent} from "./component/workout/workout.component";
<<<<<<< HEAD
import {ProfileComponent} from "./component/profile/profile.component";
=======
import {CalendarComponent} from "./component/calendar/calendar.component";
>>>>>>> 0c63ef652fce6277e1e9598199db3ae7bb8a7582

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: CalendarComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'signup', component: AccountSignupComponent },
  { path: 'workouts', component: WorkoutComponent },
  { path: 'profile', component: ProfileComponent }
];
