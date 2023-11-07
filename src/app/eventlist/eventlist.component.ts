import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../data/event-service';
import { UserService } from '../data/user-service';
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
  public events: any;
  isloggedinHEAD=false;
  isnotloggedinHEAD=true;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private userService: UserService, private eventService: EventService, public dialog: MatDialog, private formmod: FormsModule, private dialogService: DialogService) { }

  ngOnInit() {
    this.fetchEvents();
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.events = new MatTableDataSource(this.events);
      this.events.paginator = this.paginator;
      this.events.sort = this.sort;
    });
  }

  ngDoCheck(): void {
    if(this.userService.getLoggedStatus()){
      this.isloggedinHEAD=true;
      this.isnotloggedinHEAD=false;
    } else {
      this.isloggedinHEAD=false;
      this.isnotloggedinHEAD=true;
    }
  }

  isFavoriteColumnVisible(): boolean {
    return this.isloggedinHEAD;
  }
  
  openEventDialog(eventData: any): void {
    this.dialogService.openEventDialog(eventData);
  }

  fetchEvents() {
  if (this.showFavoritesOnly) {
    this.eventService.getFavoriteEvents().subscribe({
      next: (events: any[]) => {
        this.dataSource = new MatTableDataSource(events);
      },
      error: (error: any) => {
        console.error('Ein fehler ist aufgetreten!', error);
      }
    });
  } else {
    this.eventService.getEvents().subscribe({
      next: (events: any[]) => {
        this.dataSource = new MatTableDataSource(events);
      },
      error: (error: any) => {
        console.error('Ein fehler ist aufgetreten!', error);
      }
    });
  }
}


  toggleFavorite(event: any): void {
    this.eventService.toggleFavorite(event).subscribe(() => {
      event.isFavorite = !event.isFavorite; 
      this.fetchEvents(); 
    });
  }

  onShowFavoritesChange() {
    this.fetchEvents();
  }

  onPageChange(event: any): void {
    this.dataSource.paginator = this.paginator;
  }

}