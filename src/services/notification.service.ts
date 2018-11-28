import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Notification} from "../models/notification.model";
import {ExternalRequestsService} from "./externalRequests.service";
import {LoginService} from "./login.service";
import {flatMap} from "rxjs/operators";
import {interval} from "rxjs/observable/interval";

@Injectable()
export class NotificationService {
  constructor(private es: ExternalRequestsService, private ls: LoginService) { }
  getNotifications(): Observable<any> {
    return interval(10 * 1000).pipe(flatMap(() => this.ls.getUserSession().authenticated ? this.es.getNotifications(this.ls.getUser()) : new Observable(subscriber => subscriber.complete()))); // Repeats every 10 seconds
  }
  viewNotification(notification: Notification) {
    this.es.viewNotification(this.ls.getUser(), notification);
  }
  createNotification(notification: Notification): Observable<any> {
    return this.es.createNotification(notification);
  }
}
