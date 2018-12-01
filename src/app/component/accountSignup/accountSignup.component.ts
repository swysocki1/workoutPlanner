import {Component} from "@angular/core";
import { User, Friend } from "../../../models/user.model";
import {FormGroup} from "@angular/forms";
import {FormControl} from "@angular/forms";
import {LoginService} from '../../../services/login.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'account-signup',
  templateUrl: './accountSignup.html'
})
export class AccountSignupComponent {
  signUpNow;
  login;
user = new User(); 
  signUp: FormGroup = new FormGroup({
    //firstName: new FormControl(),
    //lastName: new FormControl(),
    email: new FormControl(),
    //username: new FormControl(),
    pWord: new FormControl(),
    vPWord: new FormControl()
  });
  constructor(private userService: UserService, private loginService: LoginService){

  }
    
    submitted = false;

    onSubmit() {
      //console.log(this.signUp);
      this.submitted = true;
      this.userService.signUpNow(this.doSignUp());
    }   

doSignUp(){
  
  if(this.signUp.value['pWord'] === this.signUp.value['vPWord']){
  this.user = new User();
  this.user.username = this.signUp.value['email'];
  this.user.password = this.signUp.value['pWord'];
  //console.log("signing up");
  return this.user;} 
  else {
    //console.log("error!");  
    return false;
    }
  
  }
}
