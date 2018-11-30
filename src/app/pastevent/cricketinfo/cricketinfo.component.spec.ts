import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketinfoComponent } from './cricketinfo.component';

describe('CricketinfoComponent', () => {
  let component: CricketinfoComponent;
  let fixture: ComponentFixture<CricketinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
