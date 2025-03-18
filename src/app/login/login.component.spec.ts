import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';  // For mocking observables
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    // Mock AuthService and Router
    const authServiceMock = {
      login: jest.fn(),
      setToken: jest.fn()
    };
    const routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('boundary', () => {
    it('should create the LoginComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should call login() method from AuthService when form is submitted', () => {
      // Arrange
      const username = 'user1';
      const password = 'password1';
      component.username = username;
      component.password = password;

      // Mock successful login response
      authService.login = jest.fn(() => of({ token: 'dummy-token' }));

      // Act
      component.login();
      fixture.detectChanges();

      // Assert
      expect(authService.login).toHaveBeenCalledWith(username, password);
      expect(authService.setToken).toHaveBeenCalledWith('dummy-token');
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should display an error message when login fails', () => {
      // Arrange
      const username = 'wrongUser';
      const password = 'wrongPassword';
      component.username = username;
      component.password = password;

      // Mock failed login response
      authService.login = jest.fn(() => throwError(new Error('Invalid credentials')));

      // Act
      component.login();
      fixture.detectChanges();

      // Assert
      expect(component.errorMessage).toBe('Invalid credentials. Please try again.');
    });

    it('should enable login button if form is valid', () => {
      // Arrange
      component.username = 'validUser';
      component.password = 'validPassword';

      // Act
      fixture.detectChanges();
      const loginButton = fixture.nativeElement.querySelector('button');

      // Assert
      expect(loginButton.disabled).toBeFalsy();
    });

    it('should display error message if form is submitted with invalid credentials', () => {
      // Arrange
      component.username = 'wrongUser';
      component.password = 'wrongPassword';

      // Mock the error response from login
      authService.login = jest.fn(() => throwError(new Error('Invalid credentials')));

      // Act
      component.login();
      fixture.detectChanges();

      // Assert
      const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
      expect(errorMessageElement.textContent).toBe('Invalid credentials. Please try again.');
    });
  });
});
