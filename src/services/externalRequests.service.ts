import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RequestOptions} from "@angular/http";
import {Headers} from "@angular/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class ExternalRequestsService {
  api = environment.appAPI;
  workoutPath = '/workout';
  exercisePath = '/exercise';

  constructor(private http: HttpClient) { }

  getAllWorkouts(): Observable<Object> {
    return this.http.get(`${this.api}${this.workoutPath}/getAll`);
  }
  
  addWorkout(workout) {
    return this.http.post(`${this.api}${this.workoutPath}/add`, workout);
  }

  deleteWorkout(workout) {
    return this.http.post(`${this.api}${this.workoutPath}/delete`, workout);
  }

  addExercise(obj): Observable<Object> {
    return this.http.post(`${this.api}${this.exercisePath}/add`, obj);
  }

  updateWorkout(workout) {
    return this.http.post(`${this.api}${this.workoutPath}/update`, workout);
  }

  updateExercise(exercise) {
    return this.http.post(`${this.api}${this.exercisePath}/update`, exercise);
  }

  deleteExercise(obj): Observable<Object> {
    return this.http.post(`${this.api}${this.exercisePath}/delete`, obj);
  }
}
