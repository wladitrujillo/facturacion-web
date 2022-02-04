
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from "@angular/material/sort";
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/model/product';
import { ProductDataSource } from 'src/app/core/service/product.datasource';
import { ProductService } from 'src/app/core/service/product.service';

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

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;


  constructor(private http: HttpClient, private productService: ProductService) {

  }

  ngOnInit() {

    this.dataSource = new ProductDataSource(this.http);

    this.dataSource.loadProducts('', 'name', 0, 5);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged(), tap(() => {
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
    let sortDirection = this.sort.direction == 'desc' ? '-' : '';
    this.dataSource.loadProducts(
      this.search.nativeElement.value,
      sortDirection + this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  onDelete(index: number, e: Product) {
    this.productService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }
}
