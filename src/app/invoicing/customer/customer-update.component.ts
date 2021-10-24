
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { CatalogService } from 'src/app/_services/catalog.service';
import { Catalog } from 'src/app/_models/catalog';


@Component({
    selector: 'app-customer-update',
    templateUrl: './customer-update.component.html'

})

export class CustomerUpdateComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    minPrice = 0;
    @ViewChild('chipList', { static: true }) chipList;
    @ViewChild('resetCustomerForm', { static: true }) myNgForm;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    customerForm: FormGroup;
    identificationTypes: Catalog[];
    customerTypes: Catalog[];



    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private catalogService: CatalogService
    ) {

    }

    ngOnInit() {

        let customer = this.route.snapshot.data["customer"] || {};

        this.customerForm = this.fb.group({
            firstName: [customer.firstName || '', [Validators.required]],
            lastName: [customer.lastName || '', [Validators.required]],
            email: [customer.email || '', [Validators.required, Validators.email]],
            taxIdType: [customer.taxIdType || 'C', [Validators.required]],
            taxId: [customer.taxId || '', [Validators.required, Validators.minLength(10)]],
            type: [customer.type || 'C', [Validators.required]],
            phone: [customer.phone || ''],
            address: [customer.address || '']
        });


        this.catalogService.getCatalog("customer_type").subscribe(response => this.customerTypes = response);

        this.catalogService.getCatalog("identification_type").subscribe(response => this.identificationTypes = response);


    }


    onSubmit() {

        if (this.customerForm.invalid) {
            return;
        }

        let customer = this.route.snapshot.data["customer"];

        if (customer) {
            this.customerForm.value._id = customer._id;
            this.customerService.update(this.customerForm.value)
                .subscribe(
                    customer => { this.location.back() });
        } else {
            this.customerService.create(this.customerForm.value)
                .subscribe(customer => { this.location.back() });
        }

    }


    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.customerForm.controls[controlName].hasError(errorName);
    }




}
