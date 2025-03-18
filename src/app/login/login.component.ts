// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // On success, store the token and redirect to home
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle authentication failure
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}
