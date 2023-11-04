import { Component, OnInit } from '@angular/core';
import { EventService } from '../data/event-service';
@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  public events: any;
  constructor(private eventservice: EventService) {}
  ngOnInit() {
    this.eventservice.getData().subscribe(
      data => { this.events = data },
        err => console.log(err),
        () => console.log('loading done.')
); }
}