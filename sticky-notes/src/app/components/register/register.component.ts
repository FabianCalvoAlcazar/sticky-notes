import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public email:string;
  public password:string;
  public name:string;
  public confirmPassword:string;

  constructor(){
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.name = "";
  }

  register(){
    console.log(this.email);
    console.log(this.password);
  }
}
