import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../data/event-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../data/dialog-service.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class EventlistComponent implements OnInit {
  public events: any;
  displayedColumns: string[] = ['name'];

  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor(private eventservice: EventService, private dialog: MatDialog, private dialogService: DialogService) {}
  ngOnInit() {
    this.eventservice.getEvents().subscribe(data => {
      this.events = data;
      this.events = new MatTableDataSource(this.events);
      this.events.paginator = this.paginator;
      this.events.sort = this.sort;
    });
  }
  openEventDialog(eventData: any): void {
    this.dialogService.openEventDialog(eventData);
  }
}