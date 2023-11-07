import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../data/event-service';
import { EventdialogeditComponent } from '../eventdialogedit/eventdialogedit.component';
import { DialogService } from '../data/dialog-service.service';
import { EventdeleteComponent } from '../eventdelete/eventdelete.component';

@Component({
  selector: 'app-eventedit',
  templateUrl: './eventedit.component.html',
  styleUrls: ['./eventedit.component.css']
})
export class EventeditComponent {
  displayedColumns: string[] = ['name', 'id', 'date', 'location', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); 

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private cdr: ChangeDetectorRef, private eventService: EventService, public dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit() {

    this.eventService.getEventsForUser().subscribe({
      next: (events: any[]) => {
        this.dataSource = new MatTableDataSource(events);
      },
      error: (error: any) => {
        console.error('Ein fehler ist aufgetreten!', error);
      }
    });
  }
  openEventDialog(eventData: any): void {
    this.dialogService.openEventDialog(eventData);
  }

  UpdateEvent(element:any){
    const popup=this.dialog.open(EventdialogeditComponent,{
      enterAnimationDuration:'400ms',
      exitAnimationDuration:'400ms',
      width:'50%',
      data:{
        event: element,
        eventId: element.id
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.eventService.getEventsForUser().subscribe({
        next: (events: any[]) => {
          this.dataSource = new MatTableDataSource(events);
          },
        error: (error: any) => {
          console.error('There was an error!', error);
        }
      });
    });

  }

  deleteEvent(element: any): void {
    const popup = this.dialog.open(EventdeleteComponent, {
      data: {
        event: element,
        eventId: element.id
      }
    });
  
    popup.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.eventService.deleteEvent(element.id).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }  

  onPageChange(event: any): void {
    this.dataSource.paginator = this.paginator;
  }
}