// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    const token = this.authService.getToken();
    if (token) {
      // Ideally, you'd call an API to fetch user info here
      this.userInfo = { username: 'user1', email: 'user1@example.com' };  // Mock user info
    }
  }
}
