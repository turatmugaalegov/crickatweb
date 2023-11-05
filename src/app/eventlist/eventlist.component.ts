import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../data/event-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  public events: any;
  displayedColumns: string[] = ['id', 'name', 'date', 'type', 'ageRating', 'host', 'ticketPrice', 'location'];

  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor(private eventservice: EventService) {}
  ngOnInit() {
    this.eventservice.getEvents().subscribe(data => {
      this.events = data;
      this.events = new MatTableDataSource(this.events);
      this.events.paginator = this.paginator;
      this.events.sort = this.sort;
    }); 
  }
}