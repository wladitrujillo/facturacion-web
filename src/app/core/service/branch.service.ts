import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Branch } from '../model/branch';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class BranchService {
  constructor(private http: HttpClient, private alertService: AlertService) { }


  create(establishmentId: string, branch: Branch): Observable<Branch> {
    branch.next=0;
    return this.http.post(`/api/establishment/${establishmentId}/branch`, branch)
      .pipe(tap((newBranch: Branch) => this.log(`create Branch w/ id=${newBranch._id}`)),
        catchError(this.handleError<Branch>('create')));
  }


  update(establishmentId:string,branch: Branch): Observable<Branch> {
    return this.http.put(`/api/establishment/${establishmentId}/branch/${branch._id}`, branch)
      .pipe(tap((branch: Branch) => this.log(`update Branch w/ id=${branch._id}`)),
        catchError(this.handleError<Branch>('update')));
  }

  delete(establishmentId:string,_id: string): Observable<any> {
    return this.http.delete<Branch>(`/api/establishment/${establishmentId}/branch/${_id}`).catch(this.handleError<any>('delete'));
  }


  get(establishmentId: string, filter: string, sort: string, page: number, sizePage: number): Observable<Branch[]> {
    return this.http.get<Branch[]>(`/api/establishment/${establishmentId}/branch?q=${filter}&sort=${sort}&page=${page}&per_page=${sizePage}`).catch(this.errorHandler);
  }


  getById(establishmentId: string, _id: string): Observable<Branch> {
    return this.http.get<Branch>(`/api/establishment/${establishmentId}/branch/${_id}`).catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error || "Server Error");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for Branch consumption
      this.alertService.error(error.error || error.message);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
