import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";


import { MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { InvoiceDataSource } from 'src/app/_services/invoice.datasource';


@Component({
  selector: 'query-invoicing',
  templateUrl: './queryinvoicing.component.html',
  styleUrls: ['./queryinvoicing.component.css']
})
export class QueryInvoicingComponent implements OnInit, AfterViewInit {
 

    dataSource: InvoiceDataSource;
  
    displayedColumns = ["secuence","totalWithoutTax","total"];

  
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
    @ViewChild(MatSort, { static: false }) sort: MatSort;
  
    constructor(private http: HttpClient, 
      private actRoute: ActivatedRoute, 
      private invoiceService: InvoiceService) {

    }
  
    ngOnInit() {
  
      this.dataSource = new InvoiceDataSource(this.http);
  
      this.dataSource.loadData( '', 'asc', 0, 5);
  
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
  
   
}
