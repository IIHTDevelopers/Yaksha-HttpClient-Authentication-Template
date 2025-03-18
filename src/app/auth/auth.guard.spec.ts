import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';  // For mocking observables

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    // Mock AuthService and Router
    const authServiceMock = {
      getToken: jest.fn(),
    };
    const routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('business', () => {
    it('should be created', () => {
      expect(authGuard).toBeTruthy();
    });

    it('should allow access when the user is authenticated (token exists)', () => {
      // Mock the getToken method to return a valid token
      authService.getToken = jest.fn(() => 'dummy-token');

      // Act
      const canActivate = authGuard.canActivate();

      // Assert
      expect(canActivate).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();  // Should not navigate to login
    });

    it('should redirect to login when the user is not authenticated (no token)', () => {
      // Mock the getToken method to return null (no token)
      authService.getToken = jest.fn(() => null);

      // Act
      const canActivate = authGuard.canActivate();

      // Assert
      expect(canActivate).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);  // Should navigate to login
    });
  });
});
