import {Routes} from "@angular/router";
import {HomeComponent} from "./containers/home/home.component";
import {AdminComponent} from "./containers/admin/admin.component";
import {AccountSignupComponent} from "./component/accountSignup/accountSignup.component";
import {WorkoutComponent} from "./component/workout/workout.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'signup', component: AccountSignupComponent },
  { path: 'workouts', component: WorkoutComponent }
];
