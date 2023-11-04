import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventaddComponent } from './eventadd.component';

describe('EventaddComponent', () => {
  let component: EventaddComponent;
  let fixture: ComponentFixture<EventaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventaddComponent]
    });
    fixture = TestBed.createComponent(EventaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
