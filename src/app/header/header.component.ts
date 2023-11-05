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
    if(this.userService.getUserRole()==='admin'){
      this.isadminuser=true;
      this.ishostuser=true;
    } else{
      this.isadminuser=false;
    }
  
    if(this.userService.getUserRole()==='event_host'){
      this.ishostuser=true;
    } else{
      this.ishostuser=false;
    }

    if(this.userService.getLoggedStatus()){
      this.isloggedinHEAD=true;
      this.isnotloggedinHEAD=false;
    } else {
      this.isloggedinHEAD=false;
      this.isnotloggedinHEAD=true;
    }
  }
}