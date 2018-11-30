import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualTripComponent } from './annual-trip.component';

describe('AnnualTripComponent', () => {
  let component: AnnualTripComponent;
  let fixture: ComponentFixture<AnnualTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
