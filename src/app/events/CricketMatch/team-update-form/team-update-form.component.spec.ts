import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamUpdateFormComponent } from './team-update-form.component';

describe('TeamUpdateFormComponent', () => {
  let component: TeamUpdateFormComponent;
  let fixture: ComponentFixture<TeamUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
