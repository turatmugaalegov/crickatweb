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
      username: new FormControl('', Validators.required), // You can add more validators as needed
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
          // Handle response, save the token, etc.
          console.log(response);
          this.successMessage = 'Du bist jetzt eingeloggt!';
        },
        error => {
          // Handle error
          console.error(error);
          this.errorMessage = 'Login fehlgeschlagen. Bitte versuche es erneut.';
        }
      );
    } else {
      // Handle form validation error
    }
  }




}
