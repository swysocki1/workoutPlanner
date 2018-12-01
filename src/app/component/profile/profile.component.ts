import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { User, Friend } from "../../../models/user.model";
import { WorkoutService } from '../workout/workout.service';
import { CalendarService } from '../calendar/calendar.service';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { query } from '@angular/core/src/render3/instructions';
import 'rxjs/add/operator/filter';
import { stringify } from '@angular/core/src/render3/util';
import { ExternalRequestsService } from '../../../services/externalRequests.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DayService } from '../calendar/day/day.service';
import { Workout } from '../workout/workout.model';
import { UserService } from '../../../services/user.service';
import { Day } from '../calendar/calendar.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imagePath: string;
  pTestUser: User; //test user not for final product
  //declare viewing variables
  showMeals: boolean;
  showFeed: boolean;
  showSchedule: boolean;
  showUserDetails: boolean;
  selfView: boolean;
  currentUser: User;
  //next7Days: number[];
  next7Dates: Date[];
  private today: Date;
  targetuser: string;
  profileId: string;
  profile: User;
  isFriend: boolean;
  //week: Array<string>;
  workouts: Array<Array<Workout>> = 
  [new Array<Workout>(), new Array<Workout>(), new Array<Workout>(), new Array<Workout>(), 
    new Array<Workout>(), new Array<Workout>() , new Array<Workout>()];
  
  days: Array<Day>;

  constructor
    (private workoutService: WorkoutService, private calendarService: CalendarService, 
      private loginService: LoginService, private route: ActivatedRoute, private requests: ExternalRequestsService, 
      private dayService: DayService, private userService: UserService) {
      
      this.currentUser = this.loginService.getUser();

      //define test user for testing purposes only
      this.pTestUser = new User();
      this.pTestUser._id = 'fa246377-99df-43d2-9be1-f7e6a71379e9';
      this.pTestUser.email = 'jventura@conspiracy.org';
      this.pTestUser.friends = [new Friend()];
      this.pTestUser.username = 'jventura@conspiracy.org';
      //view variables
      this.showMeals = false; //leaving this false as meals doesn't seem to be in the works
      this.showFeed = false;
      this.showSchedule = false;
      this.showUserDetails = false;
      this.today = new Date();
      //this.next7Days = this.genNext7();
      this.next7Dates = this.genNextDates();
      this.imagePath = 'assets/images/';
      this.selfView = false;
  }
  getDay(day: Date){
    //console.log(day);
    return this.calendarService.getDayOfWeek(day.getDay());
  }
  private genNextDates(){
    var dates = [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];
    for(var i = 0; i < 7; i++){
      dates[i].setDate(this.today.getDate() + i)
    }
    return dates;
  }
  private genWorkoutWeek(){
    console.log('generating week.....')
    this.next7Dates.forEach((iDay, index)=>{
      this.dayService.getWorkoutsForDay(this.loginService.getUser()._id, moment(iDay).format('LL')).subscribe(result => {
        let res: Array<Day>;
        res = result as [Day];
        res.forEach((r, idx, arr) => {
          this.workoutService.get(r.workout).subscribe(ws => {
            console.log('inner subscribe');
            let w: Workout = ws as Workout;
            if (w) {
              w.cal = r._id;
              this.workouts[index].push(w);
              console.log("workout added to week on day number:" + index);
            }
          });
        });
        console.log(this.workouts);
      });
    });
  }
  ngOnInit() {
    this.currentUser = this.loginService.getUser();
    console.log('currentUser:' + this.currentUser);
    //testing code only
    
    this.profileId = location.search;
    this.profileId = this.profileId.replace('?id=', '');
    /*
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.profileId = params.get('id');
      console.log('inside parammap: ' + 'Id = ' + this.profileId)
    }); */
    if (this.profileId) {
      this.requests.getUser(this.profileId).subscribe(res => {
        this.profile = res as User;
      }, err=>{
        console.log("hard coded profile mode engaged due to ERROR");
        this.staticTest();
      })
    }
    else {
      this.profile = this.currentUser;
      if(!this.currentUser.friends){
        //initialize friends if it doesn't exist
        this.currentUser.friends = [new Friend()];
        this.currentUser.friends.pop();
        this.requests.updateUser(this.currentUser);
      }
      this.selfView = true;
      this.toggleDetails();
      //this.toggleFeed(); //commented out. function replaced by notifications
      this.toggleSched();
      this.genWorkoutWeek();
    } 
    console.log(this.profile);
  }
   /*this.toggleDetails();
    this.toggleFeed();
    this.toggleSched();*/
  //switches for views
  toggleDetails(){this.showUserDetails = !this.showUserDetails;}
  toggleFeed(){this.showFeed = !this.showFeed;}
  toggleMeals(){this.showMeals = !this.showMeals;}
  toggleSched(){this.showSchedule = !this.showSchedule;}
  //friend button function
  addFriend(){
    //new notification to profile
    this.currentUser.friends.push({id: this.profile._id} as Friend);
    return this.requests.updateUser(this.currentUser);
  }
  addRemoveFriend(){
    var res;
    this.profile.friends.splice(this.profile.friends.indexOf({id: this.currentUser._id} as Friend), 1);
    this.currentUser.friends.splice(this.currentUser.friends.indexOf({id: this.profile._id} as Friend), 1);
    res = this.requests.updateUser(this.profile);
    res = res + this.requests.updateUser(this.currentUser);
    return res;
  }
  getFriendStatus(){
    return (this.profile.friends.indexOf({id: this.currentUser._id} as Friend) != -1);
  }
  staticTest(){
    this.profile = this.pTestUser;
    this.profile.friends.pop();
    this.isFriend = false;
    if(!this.currentUser.friends){
      //initialize friends if it doesn't exist
      this.currentUser.friends = [new Friend()];
      this.currentUser.friends.pop();
      this.requests.updateUser(this.currentUser);
    }
  }

}
