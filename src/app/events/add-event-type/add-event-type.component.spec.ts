import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventTypeComponent } from './add-event-type.component';

describe('AddEventTypeComponent', () => {
  let component: AddEventTypeComponent;
  let fixture: ComponentFixture<AddEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
