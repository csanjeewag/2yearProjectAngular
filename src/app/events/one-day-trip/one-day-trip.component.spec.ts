import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDayTripComponent } from './one-day-trip.component';

describe('OneDayTripComponent', () => {
  let component: OneDayTripComponent;
  let fixture: ComponentFixture<OneDayTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneDayTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDayTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
