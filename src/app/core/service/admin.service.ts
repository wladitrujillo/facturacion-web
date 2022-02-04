import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Catalog } from '../model/catalog';
import { City } from '../model/city';
import { Company } from '../model/company';
import { Country } from '../model/country';
import { Menu } from '../model/menu';
import { Role } from '../model/role';
import { State } from '../model/state';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`/api/admin/menu/`).catch(this.errorHandler);
  }

  getCatalogByName(name: string): Observable<Catalog> {
    return this.http.get<Catalog>(`/api/admin/catalog/${name}`).catch(this.handleError<any>('getCatalog'));
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`/api/admin/role/`).catch(this.handleError<any>('getRoles'));
  }

  getCompany(): Observable<Company> {
    return this.http.get<Company>('/api/admin/company').catch(this.handleError<any>('getCompany'));
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('/api/admin/country').catch(this.handleError<any>('getCountries'));
  }

  getStates(country: string): Observable<State[]> {
    return this.http.get<State[]>(`/api/admin/country/${country}/state`).catch(this.handleError<any>('getState'));
  }

  getCities(country: string, state: string): Observable<City[]> {
    return this.http.get<City[]>(`/api/admin/country/${country}/state/${state}/city`).catch(this.handleError<any>('getCities'));
  }

  updateCompany(company: Company): Observable<void> {
    return this.http.put('/api/admin/company', company).catch(this.handleError<any>('updateCompany'));
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
