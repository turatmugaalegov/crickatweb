import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user-service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private userService: UserService) {
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
    // Implementieren Sie die Bearbeitungsfunktion hier
  }

  deleteUser(userId: number) {
    // Implementieren Sie die Löschfunktion hier
  }
}
