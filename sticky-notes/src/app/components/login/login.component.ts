import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email:string;
  public password:string;

  constructor(){
    this.email = "";
    this.password = "";
  }

  login(){
    console.log(this.email);
    console.log(this.password);
  }
}
