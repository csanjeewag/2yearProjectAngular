import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAttributeRegistrationComponent } from './select-attribute-registration.component';

describe('SelectAttributeRegistrationComponent', () => {
  let component: SelectAttributeRegistrationComponent;
  let fixture: ComponentFixture<SelectAttributeRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAttributeRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAttributeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
