import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { ProductDataSource } from 'src/app/_services/product.datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit, AfterViewInit {

  dataSource: ProductDataSource;
  displayedColumns = ["code", "name", "description", "price", "actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef

  title: string;
  constructor(
    private dialogRef: MatDialogRef<SearchProductComponent>,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.title = "Buscar Producto ";

    this.dataSource = new ProductDataSource(this.http);

    this.dataSource.loadProducts('', 'asc', 0, 3);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(250), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadProductsPage();
      })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadProductsPage())
      )
      .subscribe();

  }

  loadProductsPage() {
    this.dataSource.loadProducts(
      this.search.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  close(valueSelected) {
    this.dialogRef.close(valueSelected);
  }
}
