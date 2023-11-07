import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../data/event-service';

@Component({
  selector: 'app-eventadd',
  templateUrl: './eventadd.component.html',
  styleUrls: ['./eventadd.component.css']
})
export class EventaddComponent implements OnInit {
  addEventForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private eventService: EventService) {
    this.addEventForm = new FormGroup({
      name: new FormControl('', Validators.required),
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
      this.eventService.createEvent(
        this.addEventForm.value.name, 
        this.addEventForm.value.date, 
        this.addEventForm.value.type, 
        this.addEventForm.value.ageRating, 
        this.addEventForm.value.ticketPrice, 
        this.addEventForm.value.location
      ).subscribe(
        response => {
          // Handle the successful response here
          console.log(response);
          this.successMessage = 'Event wurde erstellt';
        },
        error => {
          // Handle error here
          console.error(error);
          this.errorMessage = 'Etwas hat nicht geklappt. Bitte versuche es erneut.';
        }
      );
    } else {
      // Handle form validation error
      console.error('Form is invalid');
    }
  }
}
