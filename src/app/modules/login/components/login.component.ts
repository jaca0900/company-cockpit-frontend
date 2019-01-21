import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { CONSTANTS } from '../../shared/constants';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: '../../home/coponents/home.component.html',
  styleUrls: ['../../home/coponents/home.component.scss']
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
  }

  doLogin() {
    this.authService.login(this.login, this.pass)
      .then(logged => {
        this.authService.isLoggedIn.next(true);
        StorageService.setItem('user', logged);
        this.router.navigate([CONSTANTS.MAIN_ROUTES.HOME]);
        this.status = 200;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
