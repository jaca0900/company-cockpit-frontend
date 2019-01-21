import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from '../../modules/login/services/auth/auth.service';
import { AuthServiceSpy } from '../../../mocks/services/auth.service.spy';
import { LoginComponent } from '../../modules/login/components/login.component';
import { RouterSpy } from '../../../mocks/angular/router.spy';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceSpy },
        { provide: Router, useClass: RouterSpy }
      ],
    });

    service = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should activate the route', () => {
      authService.isLoggedIn.next(true);
      service.canActivate();
      expect(service.canActivate).toBeTruthy();
  });

  it('should navigate to login when not authorized', () => {
      authService.isLoggedIn.next(false);
      service.canActivate();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
