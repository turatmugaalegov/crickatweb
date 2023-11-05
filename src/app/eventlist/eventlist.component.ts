import { Component, OnInit } from '@angular/core';
import { EventService } from '../data/event-service';
@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  public events: any;
  displayedColumns: string[] = ['id', 'name', 'date', 'type', 'ageRating', 'host', 'ticketPrice', 'location'];
  constructor(private eventservice: EventService) {}
  ngOnInit() {
    this.eventservice.getEvents().subscribe(data => {
      this.events = data;
    }); 
  }
}