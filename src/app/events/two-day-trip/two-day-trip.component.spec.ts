import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDayTripComponent } from './two-day-trip.component';

describe('TwoDayTripComponent', () => {
  let component: TwoDayTripComponent;
  let fixture: ComponentFixture<TwoDayTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoDayTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoDayTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
