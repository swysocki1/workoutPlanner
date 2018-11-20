import {Component} from "@angular/core";
import { User } from "../../../models/user.model";
import {FormGroup} from "@angular/forms";
import {FormControl} from "@angular/forms";
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'account-signup',
  templateUrl: './accountSignup.html'
})
export class AccountSignupComponent {
user = new User(); 
  signUp: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    pWord: new FormControl(),
    vPWord: new FormControl()
  });
    
    submitted = false;

    onSubmit() {this.submitted = true;
      this.doSignUp();
    }   

doSignUp(){
  if(this.signUp.value.pWord === this.signUp.value.vPWord){
  this.user = new User();
  this.user.firstName = this.signUp.value.firstName;
  this.user.lastName = this.signUp.value.lastName;
  this.user.username = this.signUp.value.username;
  this.user.email = this.signUp.value.email;
  this.user.password = this.signUp.value.pWord;
  return this.user; 
}
  else return false;
  
}
}
