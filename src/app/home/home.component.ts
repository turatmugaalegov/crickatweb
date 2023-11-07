import { Component } from '@angular/core';
import { UserService } from '../data/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isloggedinHEAD=false;
  isnotloggedinHEAD=true;

  constructor(private router:Router, private userService:UserService){
  }

  ngOnInit() {
    if(this.userService.getLoggedStatus()){
      this.isloggedinHEAD=true;
      this.isnotloggedinHEAD=false;
    } else {
      this.isloggedinHEAD=false;
      this.isnotloggedinHEAD=true;
    }

    if(this.isnotloggedinHEAD) {
      this.router.navigate(['/login']);
    }
  }

  ngDoCheck(): void {
    
  }

}