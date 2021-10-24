import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AlertService } from './alert.service';
import { Catalog } from '../_models/catalog';

@Injectable({ providedIn: 'root' })
export class CatalogService {
    constructor(private http: HttpClient, private alertService: AlertService) { }


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