import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { Customer } from 'src/app/_models/customer';
import { CustomerService } from 'src/app/_services/customer.service';
import { ProductService } from 'src/app/_services/product.service';
import { Invoice } from 'src/app/_models/invoice';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SearchProductComponent } from '../searchproduct/search-product.component';
import { SearchCustomerComponent } from '../searchcustomer/search-customer.component';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { EstablishmentService } from 'src/app/_services/establishment.service';
import { BranchService } from 'src/app/_services/branch.service';
import { Branch, User } from 'src/app/_models';
import { InvoiceDetail } from 'src/app/_models/invoice-detail';
import { AddCustomerComponent } from '../addcustomer/add-customer.component';
import { WayPayment } from 'src/app/_models/waypayment';
import { AuthenticationService } from 'src/app/_services';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';


declare const $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {


  @ViewChild('taxIdInput', { static: true }) taxIdInput;

  headerRow: string[];

  details: InvoiceDetail[];

  wayPayments: WayPayment[];

  customer: Customer | any;

  invoice: Invoice;

  branch: Branch;

  user: User;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private establishmentService: EstablishmentService,
    private branchService: BranchService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog) { }


  ngOnInit() {

    this.headerRow = ['CODIGO', 'PRODUCT', 'PRECIO', 'CANTIDAD', 'TOTAL'];

    this.user = this.authenticationService.currentUserValue;

    this.establishmentService.get('', 'asc', 0, 10)
      .subscribe(establishments =>
        this.branchService.get(establishments[0]._id, '', 'asc', 0, 10)
          .subscribe(branchs => {
            this.branch = branchs[0]

          }));

    this.wayPayments = [{ code: "01", value: 102.2, term: 45, unit: "45" }];

    this.initInvoice();

  }

  initInvoice() {

    this.customer = {};
    this.invoice = new Invoice();
    this.invoice.createdAt = new Date();
    this.details = []


  }

  createInvoice(branch: Branch, customer: Customer, invoice: Invoice) {
    invoice.customer = customer._id;
    invoice.detail = this.details;
    this.invoiceService.create(branch._id, invoice)
      .subscribe(newInvoice => { this.initInvoice(); console.log("Invoice created===>>", invoice) });
  }

  setTotal(): void {
    this.invoice.totalWithoutTax = this.details.map(d => d.total).reduce((a, i) => a + i, 0);
    this.invoice.total = this.details.map(d => d.total).reduce((a, i) => a + i, 0);
  };

  decreaseCount(detail: InvoiceDetail): void {
    if (detail.count > 0) detail.count--;
    detail.total = detail.count * detail.product.price;  
    this.setTotal();
  }

  increaseCount(detail: InvoiceDetail): void {
    detail.count++;
    detail.total = detail.count * detail.product.price;    
    this.setTotal();
  }

  removeItem(item) {
    let index = this.details.indexOf(item);
    this.details.splice(index, 1);
    this.setTotal();
  }

  searchCustomer() {
    this.customerService.findByTaxId(this.customer.taxId).subscribe(customer => this.customer = customer || {});
  }

  searchProduct() {
    this.productService.getById("");
  }


  addCustomer() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(AddCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      customer => {
        if (customer) this.customer = customer;
      }
    );

  }


  findCustomer() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(SearchCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      customer => {
        if (customer) this.customer = customer;
      }
    );

  }

  addProduct() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(SearchProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => {
        if (val) this.details.push({ product: val, count: 1, total: val.price });
        this.setTotal();
      }
    );

  }


}
