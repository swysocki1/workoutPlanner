import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {ExternalRequestsService} from "../../../services/externalRequests.service";


@Injectable()
export class ExerciseService {
  constructor(private er: ExternalRequestsService) { }

  add(obj) {
    return this.er.addExercise(obj);
  }

  update(exercise) {
    return this.er.updateExercise(exercise);
  }

  delete(obj) {
    return this.er.deleteExercise(obj);
  }
  get(exercise) {
    return this.er.getExercise(exercise);
  }
  
}
