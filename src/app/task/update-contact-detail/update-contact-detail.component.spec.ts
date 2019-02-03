import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContactDetailComponent } from './update-contact-detail.component';

describe('UpdateContactDetailComponent', () => {
  let component: UpdateContactDetailComponent;
  let fixture: ComponentFixture<UpdateContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
