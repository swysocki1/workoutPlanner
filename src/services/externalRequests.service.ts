import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestOptions} from "@angular/http";
import {Headers} from "@angular/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class ExternalRequestsService {
  authorization: string;
  api = environment.appAPI;
  workoutPath = '/workout';
  exercisePath = '/exercise';
  calendarPath = '/calendar';
  userPath = '/user';

  constructor(private http: HttpClient) { }

  createAccount(username: string, password: string) {
    return this.http.post(`${this.api}/createAccount`, {
      username: username,
      password: password
    });
  }
  login(username: string, password: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return new Observable(sub => {
      this.http.post(`${this.api}/login`, {
        username: username,
        password: password
      }, {headers}).subscribe(res => {
        this.authorization = res['token'];
        sub.next(res);
        sub.complete();
      }, error => {
        sub.error(error);
        sub.complete();
      });
    });
  }
  updateToken(token: string) {
    this.authorization = token;
  }
  updateUser(user) {
    return this.post(`${this.api}/updateAccount`, user);
  }
  
  getAllWorkouts(userId): Observable<Object> {
    return this.get(`${this.api}${this.workoutPath}/getAll?userId=${userId}`);
  }
  
  addWorkout(workout) {
    return this.post(`${this.api}${this.workoutPath}/add`, workout);
  }

  deleteWorkout(workout) {
    return this.post(`${this.api}${this.workoutPath}/delete`, workout);
  }

  addExercise(obj): Observable<Object> {
    return this.post(`${this.api}${this.exercisePath}/add`, obj);
  }

 getExercise(obj): Observable<Object> {
    return this.get(`${this.api}${this.exercisePath}/get?id=${obj}`);
  }

  getWorkout(obj): Observable<Object> {
    return this.get(`${this.api}${this.workoutPath}/get?id=${obj}`);
  }

  updateWorkout(workout) {
    return this.post(`${this.api}${this.workoutPath}/update`, workout);
  }

  updateExercise(exercise) {
    return this.post(`${this.api}${this.exercisePath}/update`, exercise);
  }

  deleteExercise(obj): Observable<Object> {
    return this.post(`${this.api}${this.exercisePath}/delete`, obj);
  }

  getWorkoutsForDay(userId, date): Observable<any>{
    return this.get(`${this.api}${this.calendarPath}/get?userId=${userId}&date=${date}`);
  }

  getUser(id): Observable<Object>{
    return this.get(`${this.api}${this.userPath}/get?username=${id}`);
  }

  private get(url) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.authorization}`);
    return this.http.get(url, {headers});
  }

  private post(url, data) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this.authorization}`);
    return this.http.post(url, data, {headers});
  }
}
