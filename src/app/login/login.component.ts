import { Component } from '@angular/core';
import { UserService } from '../data/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userservice: UserService) {
    logoutUser();
  }
}