import { Component, OnInit } from '@angular/core';
import { EventService } from '../data/event-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-eventadd',
  templateUrl: './eventadd.component.html',
  styleUrls: ['./eventadd.component.css']
})
export class EventaddComponent implements OnInit {
  addEventForm: FormGroup;

  constructor(private eventService: EventService) {
    this.addEventForm = new FormGroup({
      name: new FormControl('', Validators.required), // You can add more validators as needed
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      ageRating: new FormControl('', Validators.required),
      ticketPrice: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }


  createEvent(): void {
    if (this.addEventForm.valid) {
      this.eventService.createEvent(this.addEventForm.value.name, this.addEventForm.value.date, this.addEventForm.value.type, this.addEventForm.value.ageRating, this.addEventForm.value.ticketPrice, this.addEventForm.value.location).subscribe(
        response => {
          // Handle response, save the token, etc.
          console.log(response);
        },
        error => {
          // Handle error
          console.error(error);
        }
      );
    } else {
      // Handle form validation error
    }
  }




}
