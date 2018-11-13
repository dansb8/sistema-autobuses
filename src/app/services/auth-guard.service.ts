import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivate,
  CanActivateChild
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn()) {
        return true;
    }
    // Retain the attempted URL for redirection
    //this.authService.redirectUrl = url;
    else{
    this.router.navigate(['/login']);
    return false;
    }
  }

}
export class AdminGuard implements CanActivate,CanActivateChild{
    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.authService.isAdmin();
      }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        return this.authService.isAdmin();
    }

      checkLoggedInAdmin(url: string): boolean {
        if (this.authService.isAdmin()) {
            return true;
        }
        // Retain the attempted URL for redirection
        //this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
      }
}
