import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../data/event-service';
import { EventdialogeditComponent } from '../eventdialogedit/eventdialogedit.component';
import { DialogService } from '../data/dialog-service.service';

@Component({
  selector: 'app-eventedit',
  templateUrl: './eventedit.component.html',
  styleUrls: ['./eventedit.component.css']
})
export class EventeditComponent {
  displayedColumns: string[] = ['name', 'id', 'date', 'location', 'action'];
  dataSource!: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private eventService: EventService, public dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit() {

    this.eventService.getEventsForUser().subscribe({
      next: (events: any[]) => {
        this.dataSource = new MatTableDataSource(events);
        // If you are setting paginator and sort in ngOnInit, then it may not be available at this time.
        // You may have to use ngAfterViewInit or set a timeout to wait for the view to be initialized.
      },
      error: (error: any) => {
        // Handle errors here
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
        event: element
      }
    })
    popup.afterClosed().subscribe(res=>{
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
    });

  }

  onPageChange(event: any): void {
    // Update the data source based on the page event
    this.dataSource.paginator = this.paginator;
  }
}