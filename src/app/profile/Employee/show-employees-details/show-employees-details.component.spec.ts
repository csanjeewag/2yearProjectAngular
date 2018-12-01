import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeesDetailsComponent } from './show-employees-details.component';

describe('ShowEmployeesDetailsComponent', () => {
  let component: ShowEmployeesDetailsComponent;
  let fixture: ComponentFixture<ShowEmployeesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEmployeesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
