import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { AuthServiceSpy } from '../../../../mocks/services/auth.service.spy';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceSpy}
      ]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent); // wrapper for component and template
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    el = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onSubmit should call AuthService#login', () => {
    spyOn(authService, 'login').and.callThrough();

    component.doLogin();

    expect(authService.login).toHaveBeenCalled();
  });
});
