import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';  // For mocking observables

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let authService: AuthService;

  beforeEach(() => {
    // Mock AuthService
    const authServiceMock = {
      getToken: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  describe('boundary', () => {
    it('should create the HomeComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should set userInfo if token exists', () => {
      // Mock the getToken method to return a token
      authService.getToken = jest.fn(() => 'dummy-token');
      fixture.detectChanges();

      component.getUserInfo();  // Manually call getUserInfo()

      // Assert userInfo is set correctly
      expect(component.userInfo).toEqual({ username: 'user1', email: 'user1@example.com' });
    });

    it('should not set userInfo if no token exists', () => {
      // Mock the getToken method to return null
      authService.getToken = jest.fn(() => null);
      fixture.detectChanges();

      component.getUserInfo();  // Manually call getUserInfo()

      // Assert userInfo is not set
      expect(component.userInfo).toBeUndefined();
    });

    it('should display the correct username in the template', () => {
      // Simulate a valid token being set
      authService.getToken = jest.fn(() => 'dummy-token');
      component.userInfo = { username: 'user1', email: 'user1@example.com' };

      fixture.detectChanges();  // Trigger change detection

      const usernameElement = fixture.nativeElement.querySelector('p');
      expect(usernameElement.textContent).toContain('user1');
    });
  });
});
