import {Injectable} from '@angular/core';
import {Workout} from './workout.model';
import {Exercise} from '../exercise/exercise.model';
import {ExternalRequestsService} from "../../../services/externalRequests.service";


@Injectable()
export class WorkoutService {
  constructor(private er: ExternalRequestsService) { }

  update(workout) {
    return this.er.updateWorkout(workout);
  }

  add(workout) {
    return this.er.addWorkout(workout);
  }

  delete(workout) {
    return this.er.deleteWorkout(workout);
  }

  share(obj) {
    return this.er.shareWorkout(obj);
  }

  unshare(obj) {
    return this.er.unshareWorkout(obj);
  }

  getSharedWorkouts(userId) {
    return this.er.getSharedWorkouts(userId)
  }

  deleteWorkoutFromCalendar(workout) {
    return this.er.deleteWorkoutFromCalendar(workout);
  }

  getAllWorkouts(userId) {
    return this.er.getAllWorkouts(userId);
  }

  get(id) {
    return this.er.getWorkout(id);
  }
  
}
