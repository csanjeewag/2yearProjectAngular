import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogingHeaderComponent } from './loging-header.component';

describe('LogingHeaderComponent', () => {
  let component: LogingHeaderComponent;
  let fixture: ComponentFixture<LogingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
