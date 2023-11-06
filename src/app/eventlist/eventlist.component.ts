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
    this.fetchEvents();
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

  fetchEvents() {
    if (this.showFavoritesOnly) {
      this.eventService.getFavoriteEvents().subscribe({
        next: (events: any[]) => {
          this.dataSource = new MatTableDataSource(events);
          // Set up paginator and sort if needed.
        },
        error: (error: any) => {
          // Handle errors here
          console.error('There was an error!', error);
        }
      });
    } else {
      this.eventService.getEvents().subscribe({
        next: (events: any[]) => {
          this.dataSource = new MatTableDataSource(events);
          // Set up paginator and sort if needed.
        },
        error: (error: any) => {
          // Handle errors here
          console.error('There was an error!', error);
        }
      });
    }
  }

  toggleFavorite(event: any): void {
    this.eventService.toggleFavorite(event).subscribe(() => {
      event.isFavorite = !event.isFavorite; // Toggle the favorite status locally
      this.fetchEvents(); // Fetch the updated list of events
    });
  }

  onShowFavoritesChange() {
    this.fetchEvents();
  }

}