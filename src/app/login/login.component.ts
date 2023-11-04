import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required), // You can add more validators as needed
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }


  login(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        response => {
          // Handle response, save the token, etc.
          console.log(response);
          localStorage.setItem('token', response.token); // save the token
        },
        error => {
          // Handle error
          console.error(error);
        }
      );
    } else {
      // Handle form validation error
    }
  }




}
