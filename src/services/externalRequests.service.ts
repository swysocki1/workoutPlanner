import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestOptions} from "@angular/http";
import {Headers} from "@angular/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Notification} from '../models/notification.model';

@Injectable()
export class ExternalRequestsService {
  authorization: string;
  api = environment.appAPI;
  userPath = `${this.api}/user`;
  calendarPath = `${this.api}/calendar`;
  workoutPath = `${this.api}/workout`;
  exercisePath = `${this.api}/exercise`;
  notificationsPath = `${this.api}/notifications`;

  constructor(private http: HttpClient) { }

  createAccount(username: string, password: string) {
    console.log("external service request received...");
    console.log(username + " " + password);
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
  getNotifications(user: User) {
    return this.post(`${this.notificationsPath}/getAllByUserId/${user._id}`, {});
  }
  viewNotification(user: User, notification: Notification) {
    this.post(`${this.notificationsPath}/view`, {notification: notification._id, user: user._id});
  }
  createNotification(notification: Notification) {
    return this.post(`${this.notificationsPath}/create`, notification);
  }
  getAllWorkouts(userId): Observable<Object> {
    return this.get(`${this.workoutPath}/getAll?userId=${userId}`);
  }
  
  addWorkout(workout) {
    return this.post(`${this.workoutPath}/add`, workout);
  }

  deleteWorkout(workout) {
    return this.post(`${this.workoutPath}/delete`, workout);
  }

  addExercise(obj): Observable<Object> {
    return this.post(`${this.exercisePath}/add`, obj);
  }

 getExercise(obj): Observable<Object> {
    return this.get(`${this.exercisePath}/get?id=${obj}`);
  }

  getWorkout(obj): Observable<Object> {
    return this.get(`${this.workoutPath}/get?id=${obj}`);
  }

  updateWorkout(workout) {
    return this.post(`${this.workoutPath}/update`, workout);
  }

  updateExercise(exercise) {
    return this.post(`${this.exercisePath}/update`, exercise);
  }

  updateWeight(obj) {
    return this.post(`${this.exercisePath}/updateWeight`, obj);
  }

  addWeight(obj) {
    return this.post(`${this.exercisePath}/addWeight`, obj);
  }

  deleteExercise(obj): Observable<Object> {
    return this.post(`${this.exercisePath}/delete`, obj);
  }

  getWorkoutsForDay(userId, date): Observable<any> {
    return this.get(`${this.calendarPath}/getWorkouts?userId=${userId}&date=${date}`);
  }

  deleteWorkoutForDay(obj): Observable<any> {
    return this.post(`${this.calendarPath}/deleteWorkoutForDay`, obj);
  }

  deleteWorkoutFromCalendar(obj): Observable<any> {
    return this.post(`${this.calendarPath}/deleteWorkoutFromCalendar`, obj);
  }

  getUser(id): Observable<Object> {
    return this.get(`${this.userPath}/get/${id}`);
  }
  getAllUsers() {
    return this.get(`${this.userPath}/getAll`);
  }
  befriendUser(currentUserId: string, newFriendId: string) {
    return this.post(`${this.userPath}/befriendUser`, {currentUser: currentUserId, newFriend: newFriendId});
  }
  unfriendUser(currentUserId: string, friendId: string) {
    return this.post(`${this.userPath}/unfriendUser`, {currentUser: currentUserId, friend: friendId});
  }
  shareWorkout(obj): Observable<Object> {
    return this.post(`${this.workoutPath}/share`, obj);
  }

  unshareWorkout(obj): Observable<Object> {
    return this.post(`${this.workoutPath}/unshare`, obj);
  }

  addWorkoutForDay(obj) {
    return this.post(`${this.calendarPath}/addWorkout`, obj);
  }

  getSharedWorkouts(userId: Observable<Object>) {
    return this.get(`${this.workoutPath}/getSharedWorkouts?userId=${userId}`);
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
    console.log(url);
    return this.http.post(url, data, {headers});
  }
}
