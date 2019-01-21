import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../modules/login/services/auth/auth.service';
import { StorageService } from '../../modules/login/services/storage/storage.service';
import { CONSTANTS } from '../../modules/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private guard: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    this.guard = !StorageService.getItem('User');

    this.authService.isLoggedIn.subscribe(val => {
      this.guard = val;
    });

    if (!this.guard) {
      this.router.navigate([CONSTANTS.MAIN_ROUTES.LOGIN]);
    }

    return this.guard;
  }
}
