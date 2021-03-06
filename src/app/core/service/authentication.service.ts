import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from '../model/company';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  //en facturacion api carpeta routh archivo Auth.Routes.ts
  register(company: Company, user: User): Observable<User> {
    return this.http.post<User>(`/auth/register`, { company, user }).catch(this.errorHandler);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.put<any>(`/auth/login`, { email, password })
      .pipe(map(data => {
        if (data && data.token) {
          //almacena los detallees del usuario para localStorage para mantener la cesion del usuario
          localStorage.setItem('currentUser', JSON.stringify(data.result));
          localStorage.setItem('auth_token', data.token);
          this.currentUserSubject.next(data.result);
        }
        return data.result;
      })).catch(this.errorHandler);
  }

  loginCompany(ruc: string, email: string, password: string): Observable<any> {
    return this.http.put<any>(`/auth/company/${ruc}/login`, { email, password })
      .pipe(map(data => {
        if (data && data.token) {
          //almacena los detallees del usuario para localStorage para mantener la cesion del usuario
          localStorage.setItem('currentUser', JSON.stringify(data.result));
          localStorage.setItem('auth_token', data.token);
          this.currentUserSubject.next(data.result);
        }
        return data.result;
      })).catch(this.errorHandler);
  }

  logout() {
    // cierra sesi??n
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    localStorage.removeItem('auth_token');
  }
  //en facturacion api carpeta routh archivo Auth.Routes.ts
  forgotPassword(email: String): Observable<any> {
    return this.http.post<any>(`/auth/forgot-password`, { email }).catch(this.errorHandler);
  }
  //en facturacion api carpeta routh archivo Auth.Routes.ts
  forgotPasswordCompany(ruc: string, email: String): Observable<any> {
    return this.http.post<any>(`/auth/company/${ruc}/forgot-password`, { email }).catch(this.errorHandler);
  }
  //en facturacion api carpeta routh archivo Auth.Routes.ts
  resetPassword(token: string, password: string): Observable<any> {
    return this.http.put<any>(`/auth/reset-password`, { token, password }).catch(this.errorHandler);
  }
  //en facturacion api carpeta routh archivo Auth.Routes.ts
  activateAccount(userId: string): Observable<any> {
    return this.http.put<any>(`/auth/activate-account/${userId}`, {}).catch(this.errorHandler);
  }



  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error.error || error.message);
  }
}
