import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { Global } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent {
  public user: UserModel;
  public alert!:any[];
  public toast: any;

  constructor(public _userService: UserService, private router:Router){
    this.user = new UserModel("null","","","null")
    this.toast = Global.toast;
  }
  
  login(){
    this._userService.login(this.user).subscribe(
      response => {
        if (response.token) {
          this.alert = [response.message, "success"]
          localStorage.setItem("token", response.token)
          localStorage.setItem("userdata", JSON.stringify(response))
          localStorage.setItem("userId", response.userInformation._id)

          this.toast.fire({
            icon: "success",
            title: response.message
          });
          this.router.navigate(['/myStickyNotes/']);
        } else {
          this.toast.fire({
            icon: "error",
            title: response.message
          });
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
