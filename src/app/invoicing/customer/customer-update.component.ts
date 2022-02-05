
import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Catalog } from 'src/app/core/model/catalog';
import { CustomerService } from 'src/app/core/service/customer.service';
import { AdminService } from 'src/app/core/service/admin.service';
import { MatDialogRef } from '@angular/material';


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
    identificationTypes: Catalog;
    customerTypes: Catalog;
    isModalWindow: boolean = false;



    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private catalogService: AdminService,
        @Optional() private dialogRef: MatDialogRef<CustomerUpdateComponent>
    ) {

    }

    ngOnInit() {

        if (this.dialogRef) this.isModalWindow = true;

        let customer = this.route.snapshot.data["customer"] || {};

        this.customerForm = this.fb.group({
            _id: [customer._id],
            firstName: [customer.firstName || '', [Validators.required]],
            lastName: [customer.lastName || '', [Validators.required]],
            email: [customer.email || '', [Validators.required, Validators.email]],
            taxIdType: [customer.taxIdType || 'C', [Validators.required]],
            taxId: [customer.taxId || '', [Validators.required, Validators.minLength(10)]],
            type: [customer.type || 'C', [Validators.required]],
            phone: [customer.phone || ''],
            address: [customer.address || '']
        });


        this.catalogService.getCatalogByName("customer_type").subscribe(response => this.customerTypes = response);

        this.catalogService.getCatalogByName("identification_type").subscribe(response => this.identificationTypes = response);


    }


    onSubmit() {

        if (this.customerForm.invalid) {
            return;
        }

        let customer = this.route.snapshot.data["customer"];

        if (customer) {
            this.customerForm.value._id = customer._id;
            this.customerService.update(this.customerForm.value)
                .subscribe(this.onSuccess);
        } else {
            this.customerService.create(this.customerForm.value)
                .subscribe(this.onSuccess);
        }

    }

    onCloseModalWindow() {
        this.dialogRef.close(undefined);
    }


    /* Get errors */
    handleError = (controlName: string, errorName: string) => {
        return this.customerForm.controls[controlName].hasError(errorName);
    }

    private onSuccess = (customer) => {
        if (this.isModalWindow) {
            console.log("from dialogRef calling close with customer:", customer);
            this.dialogRef.close(customer);
        } else {
            console.log("from location calling back");
            this.location.back()
        }
    }



}
