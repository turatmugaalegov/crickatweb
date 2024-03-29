import { Component } from '@angular/core';
import { UserService } from '../data/user-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private userService: UserService) { }

  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.performLogout();
  }

  performLogout(): void {
    this.userService.logout().subscribe(
      response => {
        if (response) {
          localStorage.clear();
          this.userService.updateLoggedStatus();
          this.successMessage = 'Der Logout war erfolgreich ✅';
          setTimeout(function () {
            window.location.href = '/';
          }, 1000);
        } else {
          this.errorMessage = 'Logout fehlgeschlagen. Bitte versuche es erneut.';
        }
      });
  }
}