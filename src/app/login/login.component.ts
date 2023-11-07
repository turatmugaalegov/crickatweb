import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.userService.logout();
    localStorage.clear();
   }

  login(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            this.userService.updateLoggedStatus();
            this.successMessage = 'Du bist jetzt eingeloggt!';
            this.router.navigate(['']);
          } else {
            this.errorMessage = 'Login fehlgeschlagen. Bitte versuche es erneut.';
          }
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
