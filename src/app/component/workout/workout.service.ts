import {Injectable} from '@angular/core';
import {Workout} from './workout.model';
import {Exercise} from '../exercise/exercise.model';
import {ExternalRequestsService} from "../../../services/externalRequests.service";


@Injectable()
export class WorkoutService {
  constructor(private er: ExternalRequestsService) { }
  getWorkoutsForuser(userId) {

  }
  update(workout) {
    return this.er.updateWorkout(workout);
  }

  add(workout) {
    return this.er.addWorkout(workout);
  }

  delete(workout) {
    return this.er.deleteWorkout(workout);
  }

  getWorkoutsForDay(userId, day) {

  }

  getAllWorkouts() {
    return this.er.getAllWorkouts();
  }
  
}
