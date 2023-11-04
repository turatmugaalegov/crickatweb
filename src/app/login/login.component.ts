import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user-service'; // import the AuthService
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myGroup: FormGroup;

  username = ''; // for login
  password = ''; // for login

  constructor(
    private userService: UserService // add the AuthService here
  ) { 
    this.myGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() { }

  login(): void {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        // handle response, save the token, etc.
        console.log(response);
        localStorage.setItem('token', response.token); // save the token
      },
      error => {
        // handle error
        console.error(error);
      }
    );
  }

  storeDataOnDB(): void {
    const token = localStorage.getItem('token'); // get the token
    if (!token) {
      alert('Not authenticated');
      return;
    }



  }
}