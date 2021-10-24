import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { InvoicingRoutes } from './invoicing.routing';
import { ProductListComponent } from './product/product-list.component';
import { CustomerComponent } from './customer/customer.component';
import { EstablishmentComponent } from './establishment/establishment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductService } from '../_services/product.service';
import { ProductUpdateComponent } from './product/product-update.component';
import { CustomerUpdateComponent } from './customer/customer-update.component';
import { UserComponent } from './users/user.component';
import { UserUpdateComponent } from './users/user-update.component';
import { RoleService } from '../_services/role.service';
import { EstablishmentUpdateComponent } from './establishment/establishment-update.component';
import { EstablishmentService } from '../_services/establishment.service';
import { BranchComponent } from './branch/branch.component';
import { BranchUpdateComponent } from './branch/branch-update.component';
import { BranchService } from '../_services/branch.service';
import { ProductResolver } from '../_services/product.resolver';
import { CustomerResolver } from '../_services/customer.resolver';
import { EstablishmentResolver } from '../_services/establishment.resolver';
import { BranchResolver } from '../_services/branch.resolver';
import { UserResolver } from '../_services/user.resolver';
import { SearchProductComponent } from './searchproduct/search-product.component';
import { SearchCustomerComponent } from './searchcustomer/search-customer.component';
import { AddCustomerComponent } from './addcustomer/add-customer.component';
import { QueryInvoicingComponent } from './queryinvocing/queryinvoicing.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InvoicingRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ProductListComponent,
    ProductUpdateComponent,
    SearchProductComponent,
    CustomerComponent,
    CustomerUpdateComponent,
    SearchCustomerComponent,
    AddCustomerComponent,
    UserComponent,
    UserUpdateComponent,
    EstablishmentComponent,
    InvoiceComponent,
    EstablishmentUpdateComponent,
    BranchComponent,
    BranchUpdateComponent,
    QueryInvoicingComponent
  ],
  providers: [
    ProductService,
    ProductResolver,
    RoleService,
    EstablishmentService,
    EstablishmentResolver,
    BranchService,
    BranchResolver,
    CustomerResolver,
    UserResolver
  ],
  entryComponents: [
    SearchProductComponent,
    SearchCustomerComponent,
    AddCustomerComponent
  ]
})

export class InvoicingModule { }
