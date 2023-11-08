import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>([]); // Hier setzen Sie den Typ auf 'any'
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.dataSource.data = data.users;
      },
      (error: any) => {
        console.error('Fehler beim Laden der Benutzerliste', error);
      }
    );
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Hier können Sie die Aktualisierung des Benutzers nach dem Schließen des Dialogs durchführen
        // result enthält die aktualisierten Benutzerdaten
        this.userService.updateUser(result, result.userId).subscribe(
          (updatedUser: any) => {
            // Die Benutzerdaten wurden aktualisiert. Sie können die Anzeige aktualisieren oder andere Aktionen ausführen.
          },
          (error: any) => {
            console.error('Fehler beim Aktualisieren des Benutzers', error);
          }
        );
      }
    });
  }

  deleteUser(userId: string) {
    // Implementieren Sie die Löschfunktion hier
    this.userService.deleteUser(userId).subscribe(
      (response: any) => {
        // Der Benutzer wurde erfolgreich gelöscht. Sie können die Anzeige aktualisieren oder andere Aktionen ausführen.
      },
      (error: any) => {
        console.error('Fehler beim Löschen des Benutzers', error);
      }
    );
  }
}
