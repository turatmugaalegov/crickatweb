import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserdatapopupComponent } from './updateuserdatapopup.component';

describe('UpdateuserdatapopupComponent', () => {
  let component: UpdateuserdatapopupComponent;
  let fixture: ComponentFixture<UpdateuserdatapopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateuserdatapopupComponent]
    });
    fixture = TestBed.createComponent(UpdateuserdatapopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
