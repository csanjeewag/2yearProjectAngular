import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRole2Guard } from './auth-role2.guard';

describe('AuthRole2Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRole2Guard]
    });
  });

  it('should ...', inject([AuthRole2Guard], (guard: AuthRole2Guard) => {
    expect(guard).toBeTruthy();
  }));
});
