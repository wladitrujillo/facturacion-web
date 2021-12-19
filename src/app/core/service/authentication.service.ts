import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  register(user: User): Observable<User> {
    return this.http.post<User>(`auth/register`, user).catch(this.errorHandler);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.put<any>(`auth/login`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          //almacena los detallees del usuario para localStorage para mantener la cesion del usuario
          localStorage.setItem('currentUser', JSON.stringify(user.result));
          localStorage.setItem('auth_token', user.token);
          this.currentUserSubject.next(user.result);
        }
        return user;
      })).catch(this.errorHandler);
  }


  logout() {
  // cierra sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    localStorage.removeItem('auth_token');
  }
  //en facturacion api carpeta routh archivo Auth.Routes.ts
  forgotPassword(email: String): Observable<any> {
    return this.http.post<any>(`auth/forgot-password`, { email }).catch(this.errorHandler);
  }
  //en facturacion api carpeta routh archivo Auth.Routes.ts
  resetPassword(token: string, password: string): Observable<any> {
    return this.http.put<any>(`auth/reset-password`, { token, password }).catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error.error || error.message);
  }
}
