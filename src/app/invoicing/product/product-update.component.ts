
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Product } from 'src/app/_models/product';
import { CatalogService } from 'src/app/_services/catalog.service';
import { Catalog } from 'src/app/_models/catalog';


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

    productTypes: Catalog[];

    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private productService: ProductService,
        private catalogService: CatalogService
    ) { }

    ngOnInit() {

        let product = this.route.snapshot.data["product"] || {};

        this.productForm = this.fb.group({
            name: [product.name || '', [Validators.required]],
            code: [product.code || '', [Validators.required]],
            auxCode: [product.auxCode || ''],
            description: [product.description || ''],
            price: [product.price || 0, [Validators.required, Validators.min(this.minPrice)]],
            type: [product.type || 'B', [Validators.required]]
        })

        this.catalogService.getCatalog('product_type').subscribe(types => this.productTypes = types);

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


    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.productForm.controls[controlName].hasError(errorName);
    }




}
