import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcFrontPageComponent } from './rc-front-page.component';

describe('RcFrontPageComponent', () => {
  let component: RcFrontPageComponent;
  let fixture: ComponentFixture<RcFrontPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcFrontPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcFrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
