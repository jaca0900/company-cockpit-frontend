import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  public isLoggedIn = false;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
  }

  logout(): void {
    this.authService.logout().then(
      () => {},
      error => {
        console.error('Error logout subscribe', error);
      });
  }

  subscribe(): void {
    this.subs.push(
      this.authService.isLoggedIn.subscribe(value => {
        this.isLoggedIn = value;
      })
    );
  }

}
