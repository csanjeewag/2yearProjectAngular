import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRole1Guard } from './auth-role1.guard';

describe('AuthRole1Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRole1Guard]
    });
  });

  it('should ...', inject([AuthRole1Guard], (guard: AuthRole1Guard) => {
    expect(guard).toBeTruthy();
  }));
});
