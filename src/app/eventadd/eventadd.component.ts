import { Component } from '@angular/core';
import { EventService } from '../data/event-service';

@Component({
  selector: 'app-eventadd',
  templateUrl: './eventadd.component.html',
  styleUrls: ['./eventadd.component.css']
})
export class EventaddComponent {
  constructor(private taskservice: EventService) { }
  ngOnInit() { }
  taskname = '';
  taskdescription = '';
  taskpriority = '';
  storeDataOnDB(): void {
    alert('Text changed to' + this.taskname + this.taskdescription + this.taskpriority);
    let task = {
      name: this.taskname,
      description: this.taskdescription,
      priority: parseInt(this.taskpriority)
    };
    this.taskservice.addData(task);
    }
}
