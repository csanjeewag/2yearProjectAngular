import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAttributeForUpdateComponent } from './select-attribute-for-update.component';

describe('SelectAttributeForUpdateComponent', () => {
  let component: SelectAttributeForUpdateComponent;
  let fixture: ComponentFixture<SelectAttributeForUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAttributeForUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAttributeForUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
