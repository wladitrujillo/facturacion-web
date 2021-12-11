
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from "@angular/material/sort";
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CustomerDataSource } from 'src/app/core/service/customer.datasource';
import { Customer } from 'src/app/core/model/customer';
import { CustomerService } from 'src/app/core/service/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {


  dataSource: CustomerDataSource;

  displayedColumns = ["firstName", "lastName", "taxId", "email", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private customerService: CustomerService, private http: HttpClient) {
  }


  ngOnInit() {

    this.dataSource = new CustomerDataSource(this.http);

    this.dataSource.loadCustomers('', 'asc', 0, 5);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCustomersPage())
      )
      .subscribe();

  }

  loadCustomersPage() {
    this.dataSource.loadCustomers(
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  onDelete(index: number, e: Customer) {
    this.customerService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }

}
