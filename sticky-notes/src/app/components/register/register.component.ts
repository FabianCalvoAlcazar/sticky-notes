import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UsersService]
})
export class RegisterComponent {
  public user: User;

  constructor(public userService: UsersService){
    this.user = new User("","","","")
  }

  register(form:any){
    this.userService.register(this.user).subscribe((data) => {
      console.log(data);
    });
  }
}
