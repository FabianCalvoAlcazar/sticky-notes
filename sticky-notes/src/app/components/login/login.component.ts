import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsersService]
})
export class LoginComponent {
  public user: User;

  constructor(public userService: UsersService){
    this.user = new User("null","","","null")
  }

  login(){
    this.userService.login(this.user).subscribe((data) => {
      console.log(data)
    })
  }
}
