// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // JSON Server URL

  constructor(private http: HttpClient) { }

  // Login method to authenticate users
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, { username, password })
      .pipe(
        catchError(err => {
          throw new Error('Invalid credentials!');
        })
      );
  }

  // Store the token in localStorage
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Logout: remove token from localStorage
  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
