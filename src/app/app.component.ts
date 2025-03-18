// src/app/app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) { }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.authService.getToken();  // Check if token exists in localStorage
  }

  // Method to log out the user
  logout(): void {
    this.authService.logout(); // Remove token from localStorage
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
