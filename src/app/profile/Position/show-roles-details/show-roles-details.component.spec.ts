import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRolesDetailsComponent } from './show-roles-details.component';

describe('ShowRolesDetailsComponent', () => {
  let component: ShowRolesDetailsComponent;
  let fixture: ComponentFixture<ShowRolesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRolesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRolesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
