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
import { ProductUpdateComponent } from './product/product-update.component';
import { CustomerUpdateComponent } from './customer/customer-update.component';
import { UserComponent } from './users/user.component';
import { UserUpdateComponent } from './users/user-update.component';
import { EstablishmentUpdateComponent } from './establishment/establishment-update.component';
import { BranchComponent } from './branch/branch.component';
import { BranchUpdateComponent } from './branch/branch-update.component';
import { SearchProductComponent } from './searchproduct/search-product.component';
import { SearchCustomerComponent } from './searchcustomer/search-customer.component';
import { AddCustomerComponent } from './addcustomer/add-customer.component';
import { QueryInvoicingComponent } from './queryinvocing/queryinvoicing.component';
import { BranchResolver } from '../core/service/branch.resolver';
import { BranchService } from '../core/service/branch.service';
import { CustomerResolver } from '../core/service/customer.resolver';
import { EstablishmentResolver } from '../core/service/establishment.resolver';
import { EstablishmentService } from '../core/service/establishment.service';
import { ProductResolver } from '../core/service/product.resolver';
import { ProductService } from '../core/service/product.service';
import { RoleService } from '../core/service/role.service';
import { UserResolver } from '../core/service/user.resolver';



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
