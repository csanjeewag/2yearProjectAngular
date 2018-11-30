import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewPageComponent } from './employee-view-page.component';

describe('EmployeeViewPageComponent', () => {
  let component: EmployeeViewPageComponent;
  let fixture: ComponentFixture<EmployeeViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
