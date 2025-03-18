import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('business', () => {
    it('should be created', () => {
      expect(authService).toBeTruthy();
    });

    it('should call login and store token on success', () => {
      const username = 'user1';
      const password = 'password1';
      const mockToken = 'dummy-jwt-token';

      // Mock HTTP response
      const mockResponse = { token: mockToken };

      // Call the login method
      authService.login(username, password).subscribe((response) => {
        // Assert token is stored in localStorage
        expect(response.token).toBe(mockToken);
        expect(localStorage.getItem('auth_token')).toBe(mockToken);
      });

      // Simulate the HTTP request
      const req = httpMock.expectOne('http://localhost:3000/users');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      httpMock.verify();
    });

    it('should store token in localStorage when setToken is called', () => {
      const mockToken = 'dummy-jwt-token';
      authService.setToken(mockToken);

      // Assert that the token is saved in localStorage
      expect(localStorage.getItem('auth_token')).toBe(mockToken);
    });

    it('should retrieve token from localStorage', () => {
      const mockToken = 'dummy-jwt-token';
      localStorage.setItem('auth_token', mockToken);

      // Assert that the token is retrieved from localStorage
      expect(authService.getToken()).toBe(mockToken);
    });

    it('should remove token from localStorage when logout is called', () => {
      const mockToken = 'dummy-jwt-token';
      localStorage.setItem('auth_token', mockToken);

      // Call logout method
      authService.logout();

      // Assert that the token is removed from localStorage
      expect(localStorage.getItem('auth_token')).toBeNull();
    });

    afterEach(() => {
      // Clean up after each test
      httpMock.verify();
      localStorage.clear(); // Clear any data stored in localStorage
    });
  });
});
