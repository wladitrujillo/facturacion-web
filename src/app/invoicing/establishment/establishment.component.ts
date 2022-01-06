
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from "@angular/material/sort";
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EstablishmentDataSource } from './establishment.datasource';
import { Establishment } from 'src/app/core/model/establishment';
import { EstablishmentService } from 'src/app/core/service/establishment.service';


declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})

export class EstablishmentComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;

  dataSource: EstablishmentDataSource;

  displayedColumns = ["name", "code", "address", "actions"];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient, private establishmentService: EstablishmentService) {

  }

  ngOnInit() {

    this.dataSource = new EstablishmentDataSource(this.http);

    this.dataSource.load('', 'asc', 0, 5);

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
    this.dataSource.load(
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onDelete(index: number, e: Establishment) {
    this.establishmentService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }
}
