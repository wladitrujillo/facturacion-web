import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SearchProductComponent } from '../searchproduct/search-product.component';
import { SearchCustomerComponent } from '../searchcustomer/search-customer.component';
import { Branch } from 'src/app/core/model';
import { Customer } from 'src/app/core/model/customer';
import { Invoice } from 'src/app/core/model/invoice';
import { InvoiceDetail } from 'src/app/core/model/invoice-detail';
import { User } from 'src/app/core/model/user';
import { WayPayment } from 'src/app/core/model/waypayment';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { BranchService } from 'src/app/core/service/branch.service';
import { CustomerService } from 'src/app/core/service/customer.service';
import { EstablishmentService } from 'src/app/core/service/establishment.service';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { ProductService } from 'src/app/core/service/product.service';
import { AlertService } from 'src/app/core/service/alert.service';
import { CustomerUpdateComponent } from '../customer/customer-update.component';


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
    private dialog: MatDialog,
    private alertService: AlertService) { }


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
    if (!customer._id) {
      this.alertService.error("Debes seleccionar el cliente");
      return;
    }
    if (this.details.length <= 0) {
      this.alertService.error("Debes ingresar al menos un producto a la factura");
      return;
    }
    invoice.customer = customer._id;
    invoice.detail = this.details;
    this.invoiceService.create(branch._id, invoice)
      .subscribe(newInvoice => { this.initInvoice(); console.log("Invoice created===>>", invoice) });
  }

  setTotal(): void {
    this.invoice.totalWithoutTax = this.details.reduce((a, d) => a + d.totalWhitoutTax, 0);
    this.invoice.total = this.details.reduce((a, d) => a + d.total, 0);
  };

  decreaseCount(detail: InvoiceDetail): void {
    if (detail.quantity > 0) detail.quantity--;
    detail.totalWhitoutTax = detail.quantity * detail.product.price;
    let iva = detail.product.taxes.find(e => e.tax == 'IVA');
    let ivaValue = iva ? iva.percentage / 100 : 0;
    detail.total = detail.totalWhitoutTax * (1 + ivaValue);
    this.setTotal();
  }

  increaseCount(detail: InvoiceDetail): void {
    detail.quantity++;
    detail.totalWhitoutTax = detail.quantity * detail.product.price;
    let iva = detail.product.taxes.find(e => e.tax == 'IVA');
    let ivaValue = iva ? iva.percentage / 100 : 0;
    detail.total = detail.totalWhitoutTax * (1 + ivaValue);
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

    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      autoFocus: true,
      data: {},
      minWidth: "30%",
      panelClass: 'icon-outside'
    }

    const dialogRef = this.dialog.open(CustomerUpdateComponent, dialogConfig);

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
        if (val) {
          let iva = val.taxes.find(e => e.tax == 'IVA');
          let ivaValue = iva ? iva.percentage / 100 : 0;
          this.details.push({
            product: val,
            quantity: 1,
            price: val.price,
            totalWhitoutTax: val.price,
            total: val.price * (1 + ivaValue)
          });
          this.setTotal();
        }
      }
    );

  }


}
