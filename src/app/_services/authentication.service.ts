import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

import { Enterprise } from '../_models/enterprise';

@Injectable({ providedIn: 'root' })
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

    register(user: User): Observable<User> {
        return this.http.post<User>(`auth/register`, user).catch(this.errorHandler);
    }

    login(email: string): Observable<Enterprise[]> {
        let params = new HttpParams()
            .set('email', email);
        return this.http.get<Enterprise[]>(`auth/login`, { params }).catch(this.errorHandler);
    }

    authenticate(email: string, password: string, enterprise: string): Observable<User> {
        return this.http.post<any>(`auth/login`, { email, password, enterprise })
            .pipe(map(user => {
                if (user && user.token) {
                    // store user details in local storage to keep user logged in
                    localStorage.setItem('currentUser', JSON.stringify(user.result));
                    localStorage.setItem('auth_token', user.token);
                    this.currentUserSubject.next(user.result);
                }

                return user;
            })).catch(this.errorHandler);
    }


    logout() {
        // remove user data from local storage for log out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        localStorage.removeItem('auth_token');
    }

    forgotPassword(email: String): Observable<any> {
        return this.http.post<any>(`api/user/forgot-password`, { email }).catch(this.errorHandler);
    }

    resetPassword(requestId: string, password: string): Observable<any> {
        return this.http.put<any>(`api/user/reset-password/${requestId}`, { password }).catch(this.errorHandler);
    }

    errorHandler(error: HttpErrorResponse) {
        console.log(error);
        return Observable.throw(error.error || error.message);
    }
}