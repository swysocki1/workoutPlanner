import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { User } from "../../../models/user.model";
import { WorkoutService } from '../workout/workout.service';
import { CalendarService } from '../calendar/calendar.service';

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
  //next7Days: number[];
  next7Dates: Date[];
  private today: Date;
  constructor(private workoutService: WorkoutService, private calendarService: CalendarService) {
      //define test user for testing purposes only
      this.pTestUser = new User();
      this.pTestUser.firstName = 'Jim';
      this.pTestUser.lastName = 'Dandy';
      this.pTestUser._id = '12321';
      this.pTestUser.email = 'jim.dandy@me.org';
      //view variables
      this.showMeals = false; //leaving this false as meals doesn't seem to be in the works
      this.showFeed = true;
      this.showSchedule = true;
      this.showUserDetails = true;
      this.today = new Date();
      //this.next7Days = this.genNext7();
      this.next7Dates = this.genNextDates();
      this.imagePath = 'assets/images/';
      
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
  getWorkout(id: number, td: Date){
    //return this.workoutService.getWorkoutsForDay(id, td);
  }
  private genNextDates(){
    
    var dates = [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];
    for(var i = 0; i < 7; i++){
      dates[i].setDate(this.today.getDate() + i)
    }
    return dates;
  }
  ngOnInit() {
  }
  //switches for views
  toggleDetails(){this.showUserDetails = !this.showUserDetails;}
  toggleFeed(){this.showFeed = !this.showFeed;}
  toggleMeals(){this.showMeals = !this.showMeals;}
  toggleSched(){this.showSchedule = !this.showSchedule;}
<<<<<<< HEAD

}
=======
}
>>>>>>> 90382cfc94b8920f3ed94beff70f037db2fd27e8
