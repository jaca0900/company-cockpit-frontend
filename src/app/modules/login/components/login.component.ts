import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { CONSTANTS } from '../../shared/constants';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  login: string;
  pass: string;
  status: number;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.login = '';
    this.pass = '';
    this.status = 200;
    StorageService.setItem('User', {})
  }

  doRegister() {
    this.router.navigate(['/user-profile/register']);
  }

  doLogin() {
    this.authService.login(this.login, this.pass)
      .then(logged => {
        console.log(logged);

        this.authService.isLoggedIn.next(true);
        StorageService.setItem('User', logged);

        this.router.navigate([CONSTANTS.MAIN_ROUTES.HOME]);
        this.status = 200;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
