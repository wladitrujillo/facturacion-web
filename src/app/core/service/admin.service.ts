import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Catalog } from '../model/catalog';
import { Menu } from '../model/menu';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`api/admin/menu/`).catch(this.errorHandler);
  }

  getCatalog(tableId: string): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`api/table/${tableId}/catalog`).catch(this.handleError<any>('getCatalog'));
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
