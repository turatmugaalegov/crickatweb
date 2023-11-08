import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
})
export class UserEditDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    // Schließen Sie den Dialog ohne Änderungen
  }
}
