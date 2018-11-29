import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Workout} from "../workout/workout.model";
import { User } from '../../../models/user.model';
import { WorkoutService } from '../workout/workout.service';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/notification.model';
import { LoginService } from '../../../services/login.service';
import * as moment from 'moment';



@Component({
  selector: 'workout-share-modal',
  templateUrl: './shareModal.html'
})
export class ShareModalComponent implements OnInit {
  @Input() workout: Workout;
  @Input() user: User;
  @Input() friends: Array<User>;
  @Output() refresh = new EventEmitter();

  currentUser: User;

  constructor(private workoutService: WorkoutService, private notificationService: NotificationService, private loginService: LoginService) {}

  ngOnInit() {
    this.currentUser = this.loginService.getUser();
  }

  isShared(friend): boolean {
    //console.log("workout is null");
    var r = false;
    if (this.workout) {
      //console.log("workout not null");
      this.workout.sharedWith.forEach(e => {
        if (e.username === friend.username) {
          //console.log(e.username);
          r = true;
        }
      });
      
    }
    return r;
    
   
  }

  share(friend: User, share: boolean) {
    var req = {
      workoutId: this.workout._id,
      user: {
        id: friend._id,
        username: friend.username
      }};
    if (share) {
      this.workoutService.share(req).subscribe(res => {
        let notification: Notification = new Notification();
        notification.message = `${this.currentUser.username} shared a workout`;
        notification.link = `/workout/${this.workout._id}`;
        notification.created = moment().toDate() as Date;
        notification.type = 'WORKOUT_UPDATE';
        notification.users = [friend._id];
        notification.viewed = new Array<{user: string, seen: Date}>();

        this.notificationService.createNotification(notification).subscribe(n => {
          console.log(n);
          this.refresh.emit();
        }, error => {
          this.refresh.emit();
          console.error(error);
        });
        console.log("shared workout with... " + friend.username);
      }, error => {
        console.error(error);
      })
    } else {
      this.workoutService.unshare(req).subscribe(res => {
        console.log("unsharing workout with " + friend.username);
        this.refresh.emit();
      }, error => {
        console.error(error);
      })
    }
  }

}
