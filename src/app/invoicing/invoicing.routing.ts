import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list.component';
import { CustomerComponent } from './customer/customer.component';
import { EstablishmentComponent } from './establishment/establishment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductUpdateComponent } from './product/product-update.component'
import { CustomerUpdateComponent } from './customer/customer-update.component'
import { UserComponent } from './users/user.component';
import { UserUpdateComponent } from './users/user-update.component';
import { EstablishmentUpdateComponent } from './establishment/establishment-update.component';
import { BranchComponent } from './branch/branch.component';
import { BranchUpdateComponent } from './branch/branch-update.component';
import { BranchResolver } from '../core/service/branch.resolver';
import { CustomerResolver } from '../core/service/customer.resolver';
import { EstablishmentResolver } from '../core/service/establishment.resolver';
import { ProductResolver } from '../core/service/product.resolver';
import { UserResolver } from '../core/service/user.resolver';
import { QueryInvoicingComponent } from './queryinvocing/queryinvoicing.component';

export const InvoicingRoutes: Routes = [
  {
    path: 'product',
    children: [
      { path: '', component: ProductListComponent },
      { path: 'new', component: ProductUpdateComponent },
      {
        path: ':_id/edit', component: ProductUpdateComponent, resolve: {
          product: ProductResolver
        }
      }]
  },
  {
    path: 'customer',
    children: [
      { path: '', component: CustomerComponent },
      { path: 'new', component: CustomerUpdateComponent },
      {
        path: ':_id/edit', component: CustomerUpdateComponent,
        resolve: {
          customer: CustomerResolver
        }
      }]
  }, {
    path: 'user',
    children: [
      { path: '', component: UserComponent },
      { path: 'new', component: UserUpdateComponent },
      {
        path: ':_id/edit', component: UserUpdateComponent,
        resolve: {
          user: UserResolver
        }
      }]
  },
  {
    path: 'establishment',
    children: [
      { path: '', component: EstablishmentComponent },
      { path: 'new', component: EstablishmentUpdateComponent },
      {
        path: ':_id/edit', component: EstablishmentUpdateComponent,
        resolve: {
          establishment: EstablishmentResolver
        }
      },
      { path: ':establishmentId/branch', component: BranchComponent },
      { path: ':establishmentId/branch/new', component: BranchUpdateComponent },
      {
        path: ':establishmentId/branch/:branchId/edit', component: BranchUpdateComponent,
        resolve: {
          branch: BranchResolver
        }
      }]
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'query-invoice',
    component: QueryInvoicingComponent
  }
];
