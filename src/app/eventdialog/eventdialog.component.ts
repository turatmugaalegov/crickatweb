import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eventdialog',
  templateUrl: './eventdialog.component.html',
  styleUrls: ['./eventdialog.component.css']
})
export class EventdialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  eventInfo: any[] = [];

  ngOnInit() {
    this.eventInfo = [
      { label: 'Event', value: this.data.name },
      { label: 'Datum', value: this.data.date },
      { label: 'Zielgruppe', value: this.data.ageRating },
      { label: 'Veranstalter', value: this.data.host },
      { label: 'Ticket Preis', value: this.data.ticketPrice },
      { label: 'Veranstaltungsort', value: this.data.location },
    ];
  }
}