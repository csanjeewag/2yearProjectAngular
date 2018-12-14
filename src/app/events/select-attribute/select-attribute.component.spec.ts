import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAttributeComponent } from './select-attribute.component';

describe('SelectAttributeComponent', () => {
  let component: SelectAttributeComponent;
  let fixture: ComponentFixture<SelectAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
