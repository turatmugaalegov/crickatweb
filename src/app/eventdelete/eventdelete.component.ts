import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eventdelete',
  templateUrl: './eventdelete.component.html',
  styleUrls: ['./eventdelete.component.css']
})
export class EventdeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<EventdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmDelete(): void {
    const eventId = this.data.eventId;

    if (eventId) {
      this.dialogRef.close('delete');
    } else {
      console.error('Event ID is undefined or null.');
    }
  }
}
