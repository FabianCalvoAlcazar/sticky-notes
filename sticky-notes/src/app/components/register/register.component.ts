import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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
        if (response.status == true) {
          console.log(response.message)
        } else {
          console.log(response.message)
        }
      },
      error => {
        console.log("Something went wrong.")
      }
    )
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
