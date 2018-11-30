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
<<<<<<< Updated upstream
  obUser: Object;
  userToDisplay: User;
  profileId: string;

  constructor
    (private workoutService: WorkoutService, private calendarService: CalendarService, 
      private loginService: LoginService, private route: ActivatedRoute, private es: ExternalRequestsService) {
=======
  profileId: string;
  profile: User;
  isFriend: boolean;
  workouts: Array<Workout> = new Array<Workout>();

  constructor
    (private workoutService: WorkoutService, private calendarService: CalendarService, 
      private loginService: LoginService, private route: ActivatedRoute, private requests: ExternalRequestsService, 
      private dayService: DayService) {
      
>>>>>>> Stashed changes
      this.currentUser = this.loginService.getUser();

      //define test user for testing purposes only
      this.pTestUser = new User();
      this.pTestUser.firstName = 'Jim';
      this.pTestUser.lastName = 'Dandy';
      this.pTestUser._id = '12321';
      this.pTestUser.email = 'jim.dandy@me.org';
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
  /*private genNext7(){
    var days = this.today.getDay();
    var n7 = [];
    for(var i = 0; i < 7; i++){
      if(days + i < 7) n7.push(days + i);
      else n7.push(days + i - 7);
    }
    return n7;
  }*/
  
  getDay(day: Date){
    //console.log(day);
    return this.calendarService.getDayOfWeek(day.getDay());
  }
  getWorkout(){
  
    //return this.workoutService.getWorkoutsForDay(id, td);
  }

  private genNextDates(){
    var dates = [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];
    for(var i = 0; i < 7; i++){
      dates[i].setDate(this.today.getDate() + i)
    }
    return dates;
  }
  /*addFriend(){
    this.currentUser.friends.push(this.profile)
  }
  removeFriend(){
    this.currentUser.friends = this.currentUser.friends.filter(item =>{
      return item.username != this.profile.username;
    });
  }*/
  ngOnInit() {
<<<<<<< Updated upstream

    this.currentUser = this.loginService.getUser();
    


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.profileId = params.get('id');
      console.log(this.profileId);
    });

    if (this.profileId) {
      this.es.getUser(this.profileId).subscribe(res => {
        this.userToDisplay = res as User;
      })
    }
    else {
      this.userToDisplay = this.currentUser;
    }

    console.log(this.userToDisplay);
    /*
    if(this.route.queryParams.isEmpty && this.loginService.getUserSession()) {
      this.selfView = true;
      this.pTestUser = this.loginService.getUser();
    }
    else if(this.route.queryParams.isEmpty && !this.loginService.getUserSession()){
      document.write('<p>Please sign in to view your profile.</p>');
    }
    else{
      try{
        var userId = this.route.queryParams.filter(params => params.userId).subscribe(params => {
          this.targetuser = params.userId;
        });
        this.obUser = this.requests.getUser(userId).subscribe(obUser => {return obUser}); 
      }
      catch(err){
        document.write('<p>404: Page Not Found.</p>');
      }
    }
    */
=======
    this.profile = this.pTestUser;
    this.selfView = true;
    this.toggleDetails();
    this.toggleSched();
    this.toggleFeed();
    /*
    console.log(this.currentUser);
    this.route.queryParams.subscribe(params => {
      if(params['userId']){
        this.profileId = params['userId'];
      }
      else this.profileId = this.currentUser._id;
    });
    console.log(this.profileId);
    this.requests.getUser(this.profileId).subscribe(result => {
      this.profile = result as User;
  }, error => {console.log('error loading profile')});
  if(this.currentUser._id == this.profile._id){
    this.selfView = true;
  }
  if(this.selfView){
    this.toggleDetails();
    this.toggleFeed();
    this.toggleSched();
>>>>>>> Stashed changes
  }
  this.isFriend = this.getFriendStatus(); */
}
  //switches for views
  toggleDetails(){this.showUserDetails = !this.showUserDetails;}
  toggleFeed(){this.showFeed = !this.showFeed;}
  toggleMeals(){this.showMeals = !this.showMeals;}
  toggleSched(){this.showSchedule = !this.showSchedule;}
  //friend button function
  addFriend(){
    //new notification to profile
    this.currentUser.friends.push({username: this.profile.username} as Friend);
    return this.requests.updateUser(this.currentUser);
  }
  addRemoveFriend(){
    var res;
    this.profile.friends.splice(this.profile.friends.indexOf({username: this.currentUser.username} as Friend), 1);
    this.currentUser.friends.splice(this.currentUser.friends.indexOf({username: this.profile.username} as Friend), 1);
    res = this.requests.updateUser(this.profile);
    res = res + this.requests.updateUser(this.currentUser);
    return res;
  }
  getFriendStatus(){
    return (this.profile.friends.indexOf({username: this.currentUser.username} as Friend) != -1);
  }
}
