import { Component } from '@angular/core';
import { UserService } from '../data/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isadminuser=false;
  ishostuser=false;
  isloggedinHEAD=false;
  isnotloggedinHEAD=true;

  constructor(private router:Router, private userService:UserService){

  }

  

  ngDoCheck(): void {
    this.userService.getUserRole().subscribe(
      (userRole: string) => {
        if (userRole === 'ADMIN') {
          this.isadminuser=true;
          this.ishostuser=true;
        } else {
          this.isadminuser=false;
        }
      },
      (error) => {
        console.error('Fehler beim Abrufen der Benutzerrolle:', error);
        // Führen Sie eine geeignete Fehlerbehandlung durch
      }
    );

    this.userService.getUserRole().subscribe(
      (userRole: string) => {
        if (userRole === 'HOST') {
          this.isadminuser=false;
          this.ishostuser=true;
        } else {
          this.ishostuser=false;
        }
      },
      (error) => {
        console.error('Fehler beim Abrufen der Benutzerrolle:', error);
        // Führen Sie eine geeignete Fehlerbehandlung durch
      }
    );

    if(this.userService.getLoggedStatus()){
      this.isloggedinHEAD=true;
      this.isnotloggedinHEAD=false;
    } else {
      this.isloggedinHEAD=false;
      this.isnotloggedinHEAD=true;
    }
  }
}