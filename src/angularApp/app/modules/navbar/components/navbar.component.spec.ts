import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../login/services/auth/auth.service';
import { AuthServiceSpy } from '../../../../mocks/services/auth.service.spy';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AuthService, useClass: AuthServiceSpy },
      ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#logout', () => {
    it('should call authService#logout', () => {
      spyOn(authService, 'logout').and.callThrough();
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
