import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptainEmailComponent } from './captain-email.component';

describe('CaptainEmailComponent', () => {
  let component: CaptainEmailComponent;
  let fixture: ComponentFixture<CaptainEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptainEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptainEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
