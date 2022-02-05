import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaxValueService } from 'src/app/core/service/tax-value.service';
import { TaxValueDataSource } from 'src/app/core/service/tax.value.datasource';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-tax-value-list',
    templateUrl: './tax-value-list.component.html',
    styleUrls: ['./tax-value-list.component.css']
})

export class TaxValueListComponent implements OnInit, AfterViewInit {


    dataSource: TaxValueDataSource;

    displayedColumns = ["tax", "percentage", "description", "actions"];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;



    constructor(private http: HttpClient) {

    }

    ngOnInit() {

        this.dataSource = new TaxValueDataSource(this.http);

        this.dataSource.loadTaxValue('', '', 0, 5);

    }

    ngAfterViewInit() {


        merge(this.paginator.page)
            .pipe(
                tap(() => this.loadTaxValuePage())
            )
            .subscribe();

    }

    loadTaxValuePage() {
        this.dataSource.loadTaxValue(
            '',
            '',
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

}
