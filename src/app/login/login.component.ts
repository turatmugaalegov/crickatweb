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
  successMessage: string = '';
  errorMessage: string = '';

  // Add CookieService to the constructor parameters
  constructor(
    private userService: UserService, 
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }

  login(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        response => {
          this.successMessage = 'Du bist jetzt eingeloggt!';
         

        },
        error => {
          const errorMessage = error.error.message || 'Ein unerwarteter Fehler ist aufgetreten.';
          this.errorMessage = errorMessage;
          console.error('Login error:', error);
        }
      );
    } else {
      this.errorMessage = 'Bitte fülle alle Felder korrekt aus.';
    }
  }
}
