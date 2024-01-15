import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { Global } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent {
  public user: UserModel;

  constructor(public _userService: UserService, private router:Router){
    this.user = new UserModel("","","","");
  }

  register(){
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status) {
          Swal.fire({
            title: response.message,
            text: "We have created the new user with the given credentials.",
            icon: 'success',
            confirmButtonText: "Take me to login"
          }).then(() => {
            this.router.navigate(['/login']);
          })
        } else {
          Global.toast.fire({
            title: response.message,
            icon: 'error'
          })
        }
      },
      error => {
        console.log("Something went wrong.")
      }
    )
  }

  goBack() {
    Swal.fire({
      customClass: {
        confirmButton: "confirm-button",
        cancelButton: "cancel-button"
      },
      buttonsStyling: false,
      icon: 'question',
      title:'Are you sure you want to go back?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      confirmButtonText: 'Yes, go back',
      showConfirmButton:true
    }).then((result) => {
      if(result.isConfirmed) {
        this.router.navigate(['/home']);
      }
      if(result.isDismissed) {
        this.router.navigate(['/register']);
      }
    })
  }
}
