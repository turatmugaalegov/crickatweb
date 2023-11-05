import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eventdialog',
  templateUrl: './eventdialog.component.html',
  styleUrls: ['./eventdialog.component.css']
})
export class EventdialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  eventInfo: any[] = []; // Hier wird die Liste der Event-Informationen gespeichert

  ngOnInit() {
    // Erstelle die Liste der Event-Informationen
    this.eventInfo = [
      { label: 'ID', value: this.data.id },
      { label: 'Name', value: this.data.name },
      { label: 'Date', value: this.data.date },
      { label: 'Type', value: this.data.type },
      { label: 'Age Rating', value: this.data.ageRating },
      { label: 'Host', value: this.data.host },
      { label: 'Ticket Price', value: this.data.ticketPrice },
      { label: 'Location', value: this.data.location },
    ];
  }
}