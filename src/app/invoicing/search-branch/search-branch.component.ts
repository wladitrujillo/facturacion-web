import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Establishment } from 'src/app/core/model';
import { BranchDataSource } from '../branch/branch.datasource';
import { EstablishmentDataSource } from '../establishment/establishment.datasource';

@Component({
  selector: 'app-search-branch',
  templateUrl: './search-branch.component.html',
  styleUrls: ['./search-branch.component.css']
})
export class SearchBranchComponent implements OnInit {
  establishmentDataSource: EstablishmentDataSource;
  branchDataSource: BranchDataSource;
  displayedColumns = ["name", "code", "actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('search', { static: false }) search: ElementRef;

  debounceTime: number = 500;

  readonly: boolean = false;
  title: string = 'Buscar Establecimiento'

  step: number = 1;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<SearchBranchComponent>) { }

  ngOnInit() {
    this.establishmentDataSource = new EstablishmentDataSource(this.http);

    this.establishmentDataSource.load('', 'name', 0, 5);
  }
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);



    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadEstablishmentData();
      })
      ).subscribe();


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEstablishmentData())
      )
      .subscribe();

  }

  loadEstablishmentData() {
    let sortDirection = this.sort.direction == 'desc' ? '-' : '';
    this.establishmentDataSource.load(
      this.search.nativeElement.value,
      sortDirection + this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  close(valueSelected) {
    this.dialogRef.close(valueSelected);
  }

  selectEstablishment(establishment: Establishment): void {
    this.step = 2;
  }

}
