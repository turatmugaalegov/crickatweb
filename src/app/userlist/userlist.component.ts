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
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>([]); 
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
        this.userService.updateUser(result, result.id).subscribe(
          (updatedUser: any) => {
          },
          (error: any) => {
          }
        );
      }
    });
  }

  deleteUser(userId: string) {
    // Kein DeleteConfirm nötig da nur Admins auf die Userlist kommen
    this.userService.deleteUser(userId).subscribe(
      (response: any) => {
        this.successMessage = 'Account erfolgreich gelöscht!';
      },
      (error: any) => {
        console.error('Fehler beim Löschen des Benutzers', error);
      }
    );
  }
}
