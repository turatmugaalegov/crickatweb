import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user-service';

@Component({
  selector: 'app-showcred',
  templateUrl: './showcred.component.html',
  styleUrls: ['./showcred.component.css']
})
export class ShowcredComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
      }
    );
  }
}
