
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Catalog } from 'src/app/core/model/catalog';
import { ProductService } from 'src/app/core/service/product.service';
import { AdminService } from 'src/app/core/service/admin.service';
import { ProductCategory } from 'src/app/core/model/product-category';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCategoryService } from 'src/app/core/service/product-category.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-product-update',
    templateUrl: './product-update.component.html'

})

export class ProductUpdateComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    minPrice = 0;
    @ViewChild('chipList', { static: true }) chipList;
    @ViewChild('resetProductForm', { static: true }) myNgForm;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    productForm: FormGroup;
    SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

    productCategory$: Observable<ProductCategory[]>;
    refreshProductCategory$: BehaviorSubject<ProductCategory> = new BehaviorSubject<ProductCategory>(new ProductCategory());

    productTypes$: Observable<Catalog>;

    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private productService: ProductService,
        private productCategoryService: ProductCategoryService,
        private catalogService: AdminService
    ) { }

    ngOnInit() {

        this.productCategory$ = this.refreshProductCategory$.pipe(switchMap(_ => this.productCategoryService.get('', '', 0, 50)));
        this.productTypes$ = this.catalogService.getCatalogByName('product_type');

        let product = this.route.snapshot.data["product"] || {};

        this.productForm = this.fb.group({
            category: [product.category, [Validators.required]],
            name: [product.name, [Validators.required]],
            code: [product.code, [Validators.required]],
            auxCode: [product.auxCode],
            description: [product.description],
            price: [product.price || 0, [Validators.required, Validators.min(this.minPrice)]],
            type: [product.type || 'B', [Validators.required]]
        })


    }


    onSubmit() {

        if (this.productForm.invalid) {
            return;
        }

        let product = this.route.snapshot.data["product"];



        if (product) {
            this.productForm.value._id = product._id;
            this.productService.update(this.productForm.value)
                .subscribe(
                    product => { this.location.back() });
        } else {
            this.productService.create(this.productForm.value)
                .subscribe(product => { this.location.back() });
        }

    }


    handleError = (controlName: string, errorName: string) => {
        return this.productForm.controls[controlName].hasError(errorName);
    }
    addCategory() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {};

        const dialogRef = this.dialog.open(ProductCategoryComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            value => {
                if (value)
                    this.refreshProductCategory$.next(value);
            }
        );

    }



}
