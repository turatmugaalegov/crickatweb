import { Component } from '@angular/core';
import { UserService } from '../data/user-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  ngOnInit() {
    if(this.isnotloggedinHEAD) {
      this.router.navigate(['/login']);
    }
  }

  ngDoCheck(): void {
    if(this.userService.getLoggedStatus()){
      this.isloggedinHEAD=true;
      this.isnotloggedinHEAD=false;
    } else {
      this.isloggedinHEAD=false;
      this.isnotloggedinHEAD=true;
    }

    if(this.userService.getUserRole() == 'ADMIN'){
      this.isadminuser = true;
      this.ishostuser = true;
    }  else if (this.userService.getUserRole() == 'EVENT_HOST') {
      this.isadminuser = false;
      this.ishostuser = true;
    } else {
      this.isadminuser = false;
      this.ishostuser = false;
    }
  }
}