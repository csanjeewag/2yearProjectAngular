import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastdetailComponent } from './pastdetail.component';

describe('PastdetailComponent', () => {
  let component: PastdetailComponent;
  let fixture: ComponentFixture<PastdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
