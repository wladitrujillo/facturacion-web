import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";


import { MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomerDataSource } from 'src/app/_services/customer.datasource';

@Component({
  selector: 'search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit, AfterViewInit {

  dataSource: CustomerDataSource;
  displayedColumns = ["firstName", "lastName", "taxId", "email", "actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef

  title: string;
  constructor(
    private dialogRef: MatDialogRef<SearchCustomerComponent>,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.title = "Buscar Cliente ";

    this.dataSource = new CustomerDataSource(this.http);

    this.dataSource.loadCustomers('', 'asc', 0, 3);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(250), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadCustomerPage();
      })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCustomerPage())
      )
      .subscribe();

  }

  loadCustomerPage() {
    this.dataSource.loadCustomers(
      this.search.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  close(valueSelected) {
    this.dialogRef.close(valueSelected);
  }
}
