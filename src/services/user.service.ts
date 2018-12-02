import {Injectable} from '@angular/core';
import {User, UserSession} from '../models/user.model';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {ExternalRequestsService} from "./externalRequests.service";
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    constructor(private er: ExternalRequestsService, private loginService: LoginService, private router: Router) {}
    getFriends(userId) {
        return this.loginService.getUser().friends;
    }
    //KM - attempt to make user signup page work
    signUpNow(user){
        console.log("user service accessed");
        console.log(user);
        if(user != false) {
            this.loginService.createAccount(user.username, user.password).subscribe(result => {
                this.router.navigate(['/home']);
            }, error => {console.log(error);});
            //this.loginService.login(User.username, User.password);
        }
        else window.alert("signup failed!");
    }
}