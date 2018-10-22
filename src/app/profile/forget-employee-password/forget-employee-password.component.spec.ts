import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetEmployeePasswordComponent } from './forget-employee-password.component';

describe('ForgetEmployeePasswordComponent', () => {
  let component: ForgetEmployeePasswordComponent;
  let fixture: ComponentFixture<ForgetEmployeePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetEmployeePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetEmployeePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
