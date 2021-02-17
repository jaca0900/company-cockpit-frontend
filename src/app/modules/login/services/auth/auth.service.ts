import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';
import { CONSTANTS } from '../../../shared/constants';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { LoginResponse } from '../../../shared/interfaces/login-response.interface';
// import { LogoutResponse } from '../../../shared/interfaces/logout-response.interface';
// import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(username: string, pass: string): Promise<{ [key: string]: any }> {
    return this.http.post<{ [key: string]: any }>(`${environment.apiAddress}/user/login`, {
        login: username,
        password: pass
      }).toPromise()
        .catch(err => {
          console.error(err);

          return Promise.reject('INVALID CREDENTIALS');
        });
  }

  logout(): Promise<Boolean> {
    StorageService.removeItem('user');
    this.isLoggedIn.next(false);
    return this.router.navigate([CONSTANTS.MAIN_ROUTES.LOGIN]);
  }

  clearSession() {
    StorageService.removeItem('user');
    this.isLoggedIn.next(false);
    this.router.navigate([CONSTANTS.MAIN_ROUTES.LOGIN]);
  }

  register(user) {
    return this.http.post<{ [key: string]: any }>(`${environment.apiAddress}/user/register`, user);
  }

  updateUser(id, user) {
    return this.http.put<{ [key: string]: any }>(`${environment.apiAddress}/user/${id}`, user);
  }
}
