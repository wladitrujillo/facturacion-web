
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from "@angular/material/sort";
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BranchDataSource } from './branch.datasource';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/core/model';
import { BranchService } from 'src/app/core/service/branch.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})

export class BranchComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;

  dataSource: BranchDataSource;

  displayedColumns = ["name", "code", "next","actions"];

  establishmentId: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient, private actRoute: ActivatedRoute, private branchService: BranchService) {
    this.establishmentId = this.actRoute.snapshot.paramMap.get('establishmentId');
  }

  ngOnInit() {

    this.dataSource = new BranchDataSource(this.branchService);

    this.dataSource.loadEstablishments(this.establishmentId, '', 'asc', 0, 5);

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
    this.dataSource.loadEstablishments(
      this.establishmentId,
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onDelete(index: number, e: Branch) {
    this.branchService.delete(this.establishmentId,e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }
}
