import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../data/event-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../data/dialog-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'location', 'favorite'];
  dataSource!: MatTableDataSource<any>; 
  showFavoritesOnly: boolean = false;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private eventService: EventService, public dialog: MatDialog, private formmod: FormsModule ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe({
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

  toggleFavorite(event: any): void {
    // Make an API call to mark/unmark the event as a favorite
    // You can use the HttpClient to send a POST request to your API.
    // Example code to call the API:
  
    this.eventService.markAsFavorite(event.id).subscribe((response) => {
      // Handle the API response (e.g., update the event's favorite status in the local data)
      event.isFavorite = !event.isFavorite; // Toggle the favorite status locally
    });
  }
}