import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../login/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string | null {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    } else {
      return null;
    }
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
