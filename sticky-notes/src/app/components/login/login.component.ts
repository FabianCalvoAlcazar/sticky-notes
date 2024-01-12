import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent {
  public user: UserModel;

  constructor(public _userService: UserService, private router:Router){
    this.user = new UserModel("null","","","null")
  }
  
  login(){
    this._userService.login(this.user).subscribe(
      response => {
        if (response.token) {
          localStorage.setItem("token", response.token)
          localStorage.setItem("userdata", JSON.stringify(response))
          localStorage.setItem("userId", response.userInformation._id)
          this.router.navigate(['/myStickyNotes/']);
        } else {
          console.log(response.message)
        }
      },
      error => {
        console.log("Something went wrong.")
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
