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

  constructor(private userService: UserService) {
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
          // Assuming the response token is directly accessible as `response.token`
          if (response && response.token) {
            localStorage.setItem('token', response.token); // Store the token in local storage
            this.successMessage = 'Du bist jetzt eingeloggt!';
            // Further actions upon successful login, such as redirecting to another page
          } else {
            // Handle cases where the response does not contain a token
            this.errorMessage = 'Login fehlgeschlagen. Bitte versuche es erneut.';
          }
        },
        error => {
          // Handle HTTP errors
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
