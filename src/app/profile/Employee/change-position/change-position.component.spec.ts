import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePositionComponent } from './change-position.component';

describe('ChangePositionComponent', () => {
  let component: ChangePositionComponent;
  let fixture: ComponentFixture<ChangePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
