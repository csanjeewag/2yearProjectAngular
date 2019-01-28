import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskInfoComponent } from './view-task-info.component';

describe('ViewTaskInfoComponent', () => {
  let component: ViewTaskInfoComponent;
  let fixture: ComponentFixture<ViewTaskInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
