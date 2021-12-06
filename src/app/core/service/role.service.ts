import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Role } from '../model/role';
import { User } from '../model/user';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private http: HttpClient, private alertService: AlertService) { }


  getById(_id: string): Observable<User> {
    return this.http.get<User>(`api/role/${_id}`).catch(this.handleError<any>('getById'));
  }


  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`api/role/`).catch(this.handleError<any>('getRoles'));
  }

  
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error || "Server Error");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      this.alertService.error(error.error || error.message);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}