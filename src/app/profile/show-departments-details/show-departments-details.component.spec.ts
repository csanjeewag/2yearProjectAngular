import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDepartmentsDetailsComponent } from './show-departments-details.component';

describe('ShowDepartmentsDetailsComponent', () => {
  let component: ShowDepartmentsDetailsComponent;
  let fixture: ComponentFixture<ShowDepartmentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDepartmentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDepartmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
