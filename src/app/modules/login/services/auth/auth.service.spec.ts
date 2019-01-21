import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import { LoginResponseModel } from '../../../../../mocks/models/login-response.model';
import { LogoutResponseModel } from '../../../../../mocks/models/logout-response.model';
import { ListComponent } from '../../../forecast/components/list/list.component';
import { ForecastModule } from '../../../forecast/forecast.module';

describe('AuthService', () => {
  const username = 'forecast';
  const pass = 'test123!';
  let service: AuthService;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, HttpClient],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        ForecastModule
      ]
    });

    service = TestBed.get(AuthService);
    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should return an Observable<LoginResponse>', () => {
      service.login('a', 'b').subscribe(res => {
        expect(res).toEqual(LoginResponseModel);
      });

      const req = httpMock.expectOne('http://localhost:8000/login');
      expect(req.request.method).toBe('POST');
      req.flush(LoginResponseModel);
    });
  });

  describe('#logout', () => {
    it('should return an Observable<LogoutResponse>', () => {
      service.logout().subscribe(res => {
        expect(res).toEqual(LogoutResponseModel);
      });
      const req = httpMock.expectOne('http://localhost:8000/logout');
      req.flush(LogoutResponseModel);
      expect(req.request.method).toBe('GET');
    });
  });
});
