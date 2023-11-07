import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user-service';

@Component({
  selector: 'app-showcred',
  templateUrl: './showcred.component.html',
  styleUrls: ['./showcred.component.css']
})
export class ShowcredComponent implements OnInit {
  user: any; // Define a property to hold the user data

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        // Handle errors (e.g., token missing or API request failed)
      }
    );
  }
}
