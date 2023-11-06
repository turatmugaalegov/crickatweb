import { Component, Inject } from '@angular/core';
import { EventService } from '../data/event-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eventdialogedit',
  templateUrl: './eventdialogedit.component.html',
  styleUrls: ['./eventdialogedit.component.css']
})
export class EventdialogeditComponent {

  addEventForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  public eventsE: any;

  constructor(private eventService: EventService, @Inject(MAT_DIALOG_DATA) public data:any, private fb: FormBuilder) {
    this.addEventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      ageRating: ['', Validators.required],
      ticketPrice: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.eventsE = data;
    });
  }

  updateEvent(): void {
    if (this.addEventForm.valid) {
      this.eventService.updateEvent(
        this.eventsE.id, // Setze die Event-ID, die du aktualisieren möchtest.
        this.addEventForm.value
      ).subscribe(
        response => {
          // Handle the successful response here
          console.log(response);
          this.successMessage = 'Event erfolgreich aktualisiert!';
        },
        error => {
          // Handle error here
          console.error(error);
          this.errorMessage = 'Aktualisierung des Events fehlgeschlagen. Bitte versuche es erneut.';
        }
      );
    } else {
      // Handle form validation error
      console.error('Form is invalid');
    }
  }

}