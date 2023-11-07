import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcredComponent } from './showcred.component';

describe('ShowcredComponent', () => {
  let component: ShowcredComponent;
  let fixture: ComponentFixture<ShowcredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowcredComponent]
    });
    fixture = TestBed.createComponent(ShowcredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
