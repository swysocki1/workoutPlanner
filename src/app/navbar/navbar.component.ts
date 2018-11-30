import {Component, EventEmitter} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {LoginCombo, User, UserSession} from "../../models/user.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidationService} from "../../services/validation.service";
import {NavbarSearchService} from "./navbar-search.service";
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../models/notification.model";
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  notifications = [];
  userSession: UserSession;
  userSessionChange: EventEmitter<UserSession> = new EventEmitter<UserSession>();
  loginErrorMessage: string;
  login: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  search: FormGroup = new FormGroup({
    search: new FormControl()
  });
  constructor(private loginService: LoginService, private valid: ValidationService, private searchService: NavbarSearchService, 
    private notificationService: NotificationService, private router: Router){
    this.updateUserSession(this.loginService.getUserSession());
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }
  
  private updateUserSession(userSession: UserSession) {
    this.userSession = userSession;
    this.userSessionChange.emit(this.userSession);
  }
  
  private resetLoginFormGroup() {
    this.login = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }
  
  onSearch() {
    if (this.search && this.search.value && this.search.value['search'] && this.search.value['search'].trim()) {
      const searchResult = this.searchService.search(this.search.value['search'].trim());
      // TODO something needs to be done with search results
    }
  }
  
  onLogin() {
    this.loginErrorMessage = null;
    console.log(this.login);
    let loginCombo = new LoginCombo(this.valid, this.login.value['username'], this.login.value['password']);
    //const validateLogin = loginCombo.validate();
    const validateLogin = {valid: true, message: "msg"};
    
    if (validateLogin){
      if (validateLogin.valid) {
        this.loginService.login(loginCombo.username, loginCombo.password).subscribe(userSession => {
          this.updateUserSession(userSession);
          this.router.navigate(['/home'])
          location.reload();
        }, error => {
          console.error(error);
        });
      } else {
        this.loginErrorMessage = validateLogin.message;
      }
    } else {
      console.error('validate Login returned nothing');
    }
  }
  
  logout() {
    this.loginService.logout().subscribe(userSession => {
      this.userSession = userSession;
      // TODO navigate to logout page
      //
      this.router.navigate(['/home'])
      location.reload();
    }, error => {
      console.error(error);
    });
  }
  
  toggleAdmin(): void {
    this.loginService.toggleAdmin().subscribe(userSession => {
      this.updateUserSession(userSession);
    });
  }
  hasAdmin(): boolean {
    return this.loginService.hasAdmin();
  }
  isAdmin(): boolean {
    return this.loginService.isAdmin();
  }
}
