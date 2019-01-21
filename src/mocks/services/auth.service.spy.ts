import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { of, throwError } from 'rxjs';
import { LoginResponse } from '../../app/modules/shared/interfaces/login-response.interface';
import { LoginResponseModel } from '../../mocks/models/login-response.model';
import { LogoutResponse } from '../../app/modules/shared/interfaces/logout-response.interface';
import { LogoutResponseModel } from '../../mocks/models/logout-response.model';

export class AuthServiceSpy {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  login(): Observable<{ completeName: string }> {
    return of(LoginResponseModel);
  }
  // login(): Observable<LoginResponse> {
  //   return throwError('');
  // }
  logout(): Observable<LogoutResponse> {
    return of(LogoutResponseModel);
  }
}
