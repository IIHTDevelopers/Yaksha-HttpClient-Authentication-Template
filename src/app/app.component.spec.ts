import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs'; // For mocking observables

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let authService: AuthService;
    let router: Router;

    beforeEach(() => {
        // Mock the AuthService and Router
        const authServiceMock = {
            getToken: jest.fn(),
            logout: jest.fn()
        };
        const routerMock = {
            navigate: jest.fn()
        };

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    describe('boundary', () => {
        it('should create the AppComponent', () => {
            expect(component).toBeTruthy();
        });

        it('should call logout and navigate to login page when logout is triggered', () => {
            // Simulate a logged-in user
            authService.getToken = jest.fn(() => 'dummy-token');
            authService.logout = jest.fn();
            router.navigate = jest.fn();

            component.logout();

            expect(authService.logout).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        });
    });
});
