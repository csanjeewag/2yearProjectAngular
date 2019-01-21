import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePasswordChangeComponent } from './employee-password-change.component';

describe('EmployeePasswordChangeComponent', () => {
  let component: EmployeePasswordChangeComponent;
  let fixture: ComponentFixture<EmployeePasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePasswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
