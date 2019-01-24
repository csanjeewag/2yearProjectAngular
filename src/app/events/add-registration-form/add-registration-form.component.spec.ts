import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistrationFormComponent } from './add-registration-form.component';

describe('AddRegistrationFormComponent', () => {
  let component: AddRegistrationFormComponent;
  let fixture: ComponentFixture<AddRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
