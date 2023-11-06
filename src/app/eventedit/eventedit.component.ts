import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../data/event-service';

@Component({
  selector: 'app-eventedit',
  templateUrl: './eventedit.component.html',
  styleUrls: ['./eventedit.component.css']
})
export class EventeditComponent {
  displayedColumns: string[] = ['name', 'date', 'location'];
  dataSource!: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private eventService: EventService, public dialog: MatDialog ) { }

  ngOnInit() {
    this.eventService.getEventsForUser().subscribe({
      next: (events: any[]) => {
        this.dataSource = new MatTableDataSource(events);
        // If you are setting paginator and sort in ngOnInit, then it may not be available at this time.
        // You may have to use ngAfterViewInit or set a timeout to wait for the view to be initialized.
      },
      error: (error: any) => {
        // Handle errors here
        console.error('There was an error!', error);
      }
    });
  }
  openEventDialog(element: any): void {
    const dialogRef = this.dialog.open(MatDialog, {
      width: '250px',
      data: { event: element } // Pass data to your dialog here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle dialog result here
    });
  }
}