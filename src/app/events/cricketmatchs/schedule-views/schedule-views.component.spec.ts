import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewsComponent } from './schedule-views.component';

describe('ScheduleViewsComponent', () => {
  let component: ScheduleViewsComponent;
  let fixture: ComponentFixture<ScheduleViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
