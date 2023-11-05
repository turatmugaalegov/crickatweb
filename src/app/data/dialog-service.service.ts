import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventdialogComponent } from '../eventdialog/eventdialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openEventDialog(eventData: any): void {
    this.dialog.open(EventdialogComponent, {
      data: eventData,
    });
  }
}