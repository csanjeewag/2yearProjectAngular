import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegisterByLinkComponent } from './employee-register-by-link.component';

describe('EmployeeRegisterByLinkComponent', () => {
  let component: EmployeeRegisterByLinkComponent;
  let fixture: ComponentFixture<EmployeeRegisterByLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRegisterByLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegisterByLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
