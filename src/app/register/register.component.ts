import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }


  register(): void {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value.username, this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe(
        response => {
          console.log(response);
          this.successMessage = 'Account erfolgreich erstellt ✅';
          setTimeout(function () {
            window.location.href = '/';
          }, 1000);
        },
        error => {
          console.error(error);
          this.errorMessage = 'Registrierung fehlgeschlagen! Versuche es erneut';
        }
      );
    } else {
    }
  }




}
