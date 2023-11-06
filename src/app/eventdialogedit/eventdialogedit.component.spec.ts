import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdialogeditComponent } from './eventdialogedit.component';

describe('EventdialogeditComponent', () => {
  let component: EventdialogeditComponent;
  let fixture: ComponentFixture<EventdialogeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventdialogeditComponent]
    });
    fixture = TestBed.createComponent(EventdialogeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
