import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdonationComponent } from './bdonation.component';

describe('BdonationComponent', () => {
  let component: BdonationComponent;
  let fixture: ComponentFixture<BdonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
