import { Component, Inject } from '@angular/core';
import { EventService } from '../data/event-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-eventdialogedit',
  templateUrl: './eventdialogedit.component.html',
  styleUrls: ['./eventdialogedit.component.css'],
})
export class EventdialogeditComponent {

  addEventForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  public eventsE: any;

  constructor(
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ){   this.addEventForm = this.fb.group({
    name: [data.event.name, Validators.required],
    date: [data.event.date, Validators.required],
    type: [data.event.type, Validators.required],
    ageRating: [data.event.ageRating, Validators.required],
    ticketPrice: [data.event.ticketPrice, Validators.required],
    location: [data.event.location, Validators.required],
    });
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.eventsE = data;
    });
  }

  updateEvent(): void {
    if (this.addEventForm.valid) {
      // Create the event object to send to the service including the id
      const eventToUpdate = {
        ...this.addEventForm.value,
        id: this.data.event.id  // Get the id from the data passed to the dialog
      };
  
      this.eventService.updateEvent(eventToUpdate, eventToUpdate.id).subscribe(
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
  

  onDateChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (selectedDate) {
      this.addEventForm.controls['date'].setValue(selectedDate);
    } else {
      // Hier können Sie einen Fehler behandeln oder eine Meldung anzeigen, wenn kein Datum ausgewählt wurde.
    }
  }

  deleteEvent(eventsE: any): void {
    this.eventService.deleteEvent(this.eventsE);
  }
  

}