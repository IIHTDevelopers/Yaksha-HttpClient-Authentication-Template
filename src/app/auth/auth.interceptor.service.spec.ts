import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    // Setting up the TestBed
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('business', () => {
    it('should add Authorization header if token exists', () => {
      // Arrange
      localStorage.setItem('auth_token', 'dummy-jwt-token');
      const mockRequest = { url: '/test', method: 'GET' };

      // Act
      httpClient.get(mockRequest.url).subscribe();

      // Assert: Expect the request to have the Authorization header
      const req = httpMock.expectOne('/test');
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe('Bearer dummy-jwt-token');
      httpMock.verify();
    });

    it('should not add Authorization header if no token exists', () => {
      // Arrange
      localStorage.removeItem('auth_token');
      const mockRequest = { url: '/test', method: 'GET' };

      // Act
      httpClient.get(mockRequest.url).subscribe();

      // Assert: Expect the request to not have the Authorization header
      const req = httpMock.expectOne('/test');
      expect(req.request.headers.has('Authorization')).toBeFalsy();
      httpMock.verify();
    });

    it('should pass the request through without modifying if no token exists', () => {
      // Arrange
      localStorage.removeItem('auth_token');
      const mockRequest = { url: '/test', method: 'GET' };

      // Act
      httpClient.get(mockRequest.url).subscribe();

      // Assert: The request should pass through without any Authorization header
      const req = httpMock.expectOne('/test');
      expect(req.request.headers.has('Authorization')).toBeFalsy();
      httpMock.verify();
    });

    it('should pass the request through with the modified header if token exists', () => {
      // Arrange
      localStorage.setItem('auth_token', 'dummy-jwt-token');
      const mockRequest = { url: '/test', method: 'GET' };

      // Act
      httpClient.get(mockRequest.url).subscribe();

      // Assert: The request should have Authorization header
      const req = httpMock.expectOne('/test');
      expect(req.request.headers.get('Authorization')).toBe('Bearer dummy-jwt-token');
      httpMock.verify();
    });

    afterEach(() => {
      // Clean up after each test case
      localStorage.removeItem('auth_token');
    });
  });
});
