import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageviewComponent } from './imageview.component';

describe('ImageviewComponent', () => {
  let component: ImageviewComponent;
  let fixture: ComponentFixture<ImageviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
