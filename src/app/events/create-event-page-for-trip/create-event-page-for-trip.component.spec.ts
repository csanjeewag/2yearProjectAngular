import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventPageForTripComponent } from './create-event-page-for-trip.component';

describe('CreateEventPageForTripComponent', () => {
  let component: CreateEventPageForTripComponent;
  let fixture: ComponentFixture<CreateEventPageForTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventPageForTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventPageForTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
