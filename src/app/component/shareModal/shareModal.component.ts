import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Workout} from "../workout/workout.model";
import { User } from '../../../models/user.model';
import { WorkoutService } from '../workout/workout.service';



@Component({
  selector: 'workout-share-modal',
  templateUrl: './shareModal.html'
})
export class ShareModalComponent {
  @Input() workout: Workout;
  @Input() user: User;
  @Input() friends: Array<User>;

  constructor(private workoutService: WorkoutService) {}


  isShared(friend): boolean {
    //console.log("workout is null");
    var r = false;
    if (this.workout) {
      //console.log("workout not null");
      this.workout.sharedWith.forEach(e => {
        if (e.username === friend.username || e.id === friend.id) {
          //console.log(e.username);
          r = true;
        }
      });
      
    }
    return r;
    
   
  }
  share(friend, val) {
    var req = {
      workoutId: this.workout._id, 
      user: {
        id: friend.id,
        username: friend.username
      }};
    if (val == true) {
      this.workoutService.share(req).subscribe(res => {
        console.log("shared workout with... " + friend.username);
      })
    }
    else {
      this.workoutService.unshare(req).subscribe(res => {
        console.log("unsharing workout with " + friend.username);
      })
    }
  }

}
