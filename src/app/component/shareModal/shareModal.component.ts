import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Workout} from "../workout/workout.model";
import { User } from '../../../models/user.model';
declare var $: any;

@Component({
  selector: 'workout-share-modal',
  templateUrl: './shareModal.html'
})
export class ShareModalComponent {
  @Input() workout: Workout;
  @Input() user: User;
  @Input() friends: Array<User>;

}
