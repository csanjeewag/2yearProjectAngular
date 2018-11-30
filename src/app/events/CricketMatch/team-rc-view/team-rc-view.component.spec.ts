import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRcViewComponent } from './team-rc-view.component';

describe('TeamRcViewComponent', () => {
  let component: TeamRcViewComponent;
  let fixture: ComponentFixture<TeamRcViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRcViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
