import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadpasteventComponent } from './uploadpastevent.component';

describe('UploadpasteventComponent', () => {
  let component: UploadpasteventComponent;
  let fixture: ComponentFixture<UploadpasteventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadpasteventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadpasteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
