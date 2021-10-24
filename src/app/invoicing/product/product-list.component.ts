
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { AlertService } from '../../_services/alert.service';
import { Product } from 'src/app/_models/product';
import { ProductDataSource } from '../../_services/product.datasource';
import { MatPaginator } from '@angular/material';
import { MatSort } from "@angular/material/sort";
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductListComponent implements OnInit, AfterViewInit {


  dataSource: ProductDataSource;

  displayedColumns = ["code", "name", "description", "price", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient, private productService: ProductService) {

  }

  ngOnInit() {

    this.dataSource = new ProductDataSource(this.http);

    this.dataSource.loadProducts('', 'asc', 0, 5);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadProductsPage())
      )
      .subscribe();

  }

  loadProductsPage() {
    this.dataSource.loadProducts(
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onDelete(index: number, e: Product) {
    this.productService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }
}
