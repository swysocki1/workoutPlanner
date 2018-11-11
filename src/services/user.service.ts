import {Injectable} from '@angular/core';
import {User, UserSession} from '../models/user.model';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {ExternalRequestsService} from "./externalRequests.service";
import { LoginService } from './login.service';

@Injectable()
export class UserService {
    constructor(private er: ExternalRequestsService, private loginService: LoginService) {}

    getFriends(userId) {
        return this.loginService.getUser().friends;
    }
}