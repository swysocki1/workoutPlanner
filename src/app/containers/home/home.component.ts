import {Component, OnInit} from "@angular/core";
import { LoginService } from "../../../services/login.service";

@Component({
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  loggedIn: boolean;
  constructor(private loginService: LoginService){}

  ngOnInit(){
    this.loggedIn = !(this.loginService.getUser()._id == undefined);
    console.log(this.loginService.getUser()._id);
  }
}
