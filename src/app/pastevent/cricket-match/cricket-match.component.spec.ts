import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketMatchComponent } from './cricket-match.component';

describe('CricketMatchComponent', () => {
  let component: CricketMatchComponent;
  let fixture: ComponentFixture<CricketMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
