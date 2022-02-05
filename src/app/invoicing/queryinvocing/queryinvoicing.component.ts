import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InvoiceDataSource } from 'src/app/core/service/invoice.datasource';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'query-invoicing',
  templateUrl: './queryinvoicing.component.html',
  styleUrls: ['./queryinvoicing.component.css']
})
export class QueryInvoicingComponent implements OnInit, AfterViewInit {


  dataSource: InvoiceDataSource;

  displayedColumns = ["secuence", "createdAt", "totalWithoutTax", "total", "actions"];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private http: HttpClient,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {

    this.dataSource = new InvoiceDataSource(this.http);

    this.dataSource.loadData('', 'asc', 0, 5);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadInvoicePage())
      )
      .subscribe();

  }

  loadInvoicePage() {
    this.dataSource.loadData(
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onPrintClick(invoiceId: string) {

    let host = `${environment.apiBaseUrl}/api/report/${invoiceId}`;
    console.log(host);
    window.open(host, "_blank");

  }


}
