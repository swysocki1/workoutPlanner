/**
 * Created by swysocki on 5/10/18.
 */

import {Injectable} from '@angular/core';
import {User, UserSession} from '../models/user.model';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {ExternalRequestsService} from "./externalRequests.service";

@Injectable()
export class LoginService {
  private _user: User = new User();
  private _userSession: UserSession = new UserSession();
  private _friends: Array<User> = new Array<User>();
  getUser(): User {
    return this._user;
  }

  getFriends(): Array<User>{
    return this._friends;
  }

  private setUser(value: User) {
    this._user = value;
    //console.log(value);
    this.setFriends();
  }

  getUserSession(): UserSession {
    return this._userSession;
  }

  private setUserSession(value: UserSession) {
    
    this._userSession = value;
    
    if (this._userSession) {
      if (this._userSession.token) {
        this.es.updateToken(this._userSession.token);
      }
      this.setUser(value.user);
      //console.log(this._user);
      
    }
  }

  constructor(private es: ExternalRequestsService) {
    const cachedSession: UserSession = JSON.parse(localStorage.getItem('CFBlocks'));
    if (cachedSession && cachedSession.user.username && cachedSession.lastLogin &&
      moment(cachedSession.lastLogin).isSameOrAfter(moment().subtract(1, 'days'))) {
      this.setUserSession(cachedSession);
      this.es.updateToken(cachedSession.token);
    }
  }

  private setFriends() {
    if(this._user.friends) {
      this._user.friends.forEach(i => {
        this.es.getUser(i.username).subscribe(res => {
          this._friends.push(res as User);
          //console.log(res);
        });
      });
    }
  }

  // isLogedIn(): boolean {
  //   return this._userSession ? true : false;
  // }
  login(username: string, password: string): Observable<UserSession> {
    return new Observable(subscriber => {
      const cachedSession: UserSession = JSON.parse(localStorage.getItem('CFBlocks'));
      if (cachedSession && cachedSession.user.username === username && cachedSession.lastLogin &&
        moment(cachedSession.lastLogin).isSameOrAfter(moment().subtract(1, 'days'))) {
        this.es.updateToken(cachedSession.token);
        subscriber.next(cachedSession);
        subscriber.complete();
      } else if (cachedSession) {
        localStorage.removeItem('CFBlocks');
      }

      // TODO auth user and cache

      const userSession = new UserSession();
      this.es.login(username, password).subscribe(res => {
        // userSession.setTestUser(); // Setting test user // Needs to be deleted
        userSession.token = res['token'];
        userSession.authenticated = true;
        userSession.lastLogin = new Date();
        userSession.created = new Date();
        userSession.userAgent = navigator.userAgent;
        userSession.user = res['user'];
        
        localStorage.setItem('CFBlocks', JSON.stringify(userSession));
        this.setUserSession(userSession);
  
        subscriber.next(userSession);
        subscriber.complete();
      }, error => {
        subscriber.error(error);
        subscriber.complete();
      })
    });

    
  }
  logout(): Observable<UserSession> {
    return new Observable(subscriber => {
      console.log('loggingOut');
      localStorage.removeItem('CFBlocks');
      this.setUserSession(null);
      subscriber.next(this.getUserSession());
      subscriber.complete();

      // TODO error on logging out
    });
  }
  hasAdmin() {
    if (this._userSession && this._userSession.user && this._userSession.user.roles) {
      const userRoles = this._userSession.user.roles;
      return userRoles.some(role => role.type === 'ADMIN');
    } else {
      return false;
    }
  }
  isAdmin(): boolean {
    if (this.hasAdmin()) {
      if (this._userSession && this._userSession.user && this._userSession.user.roles) {
        const userRoles = this._userSession.user.roles;
        return userRoles.some(role => role.type === 'ADMIN' && role.active);
      } else {
        return false;
      }
    }
  }
  toggleAdmin(): Observable<UserSession> {
    return new Observable(subscriber =>  {
      try {
        if (this.isAdmin()) {
          this._userSession.user.roles.find(role => role.type === 'ADMIN' && role.active).active = false;
        } else if (this.hasAdmin()) {
          this._userSession.user.roles.find(role => role.type === 'ADMIN' && !role.active).active = true;
        }
        this.setUserSession(this._userSession);
        subscriber.next(this._userSession);
      } catch(error) {
        subscriber.error(error);
      }
      subscriber.complete()
    });
  }
}
