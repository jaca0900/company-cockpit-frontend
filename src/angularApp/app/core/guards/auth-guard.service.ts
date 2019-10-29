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
    this.guard = this.isTruhy();

    console.log(this.guard);

    this.authService.isLoggedIn.subscribe(val => {
      this.guard = val;
    });

    console.log(this.guard);

    if (!this.guard) {
      console.log("DO NAVIGATE", [CONSTANTS.MAIN_ROUTES.LOGIN]);
      this.router.navigate([CONSTANTS.MAIN_ROUTES.LOGIN]);
    }

    return this.guard;
  }

  private isTruhy() {
    return StorageService.getItem('User') !== null;
  }
}
