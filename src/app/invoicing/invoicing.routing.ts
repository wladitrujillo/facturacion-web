import { Routes } from '@angular/router';
import { EstablishmentComponent } from './establishment/establishment.component';
import { EstablishmentUpdateComponent } from './establishment/establishment-update.component';
import { BranchComponent } from './branch/branch.component';
import { BranchUpdateComponent } from './branch/branch-update.component';
import { BranchResolver } from '../core/service/branch.resolver';
import { EstablishmentResolver } from '../core/service/establishment.resolver';
import { UserResolver } from '../core/service/user.resolver';

export const InvoicingRoutes: Routes = [
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
  }];
