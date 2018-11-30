import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearEndPartyComponent } from './year-end-party.component';

describe('YearEndPartyComponent', () => {
  let component: YearEndPartyComponent;
  let fixture: ComponentFixture<YearEndPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearEndPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearEndPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
