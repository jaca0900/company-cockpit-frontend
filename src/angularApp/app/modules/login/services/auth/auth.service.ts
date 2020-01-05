import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {tap} from 'rxjs/internal/operators';

import { environment } from '../../../../../environments/environment';
import { CONSTANTS } from '../../../shared/constants';
import { StorageService } from '../storage/storage.service';
import { LoginResponse } from '../../../shared/interfaces/login-response.interface';
import { LogoutResponse } from '../../../shared/interfaces/logout-response.interface';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(username: string, pass: string): Promise<LoginResponse> {
    return this.http.post<{ [key: string]: any }>('http://localhost:8000/user/login',{
        login: username,
        password: pass
      }).toPromise()
        .then(res => {
          const loginRes: LoginResponse = {
            appId: res.id,
            completeName: res.login
          };
          console.log(res);

          return loginRes;
        })
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
}
