import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { InvoicingRoutes } from './invoicing.routing';
import { EstablishmentComponent } from './establishment/establishment.component';
import { EstablishmentUpdateComponent } from './establishment/establishment-update.component';
import { BranchComponent } from './branch/branch.component';
import { BranchUpdateComponent } from './branch/branch-update.component';
import { BranchResolver } from '../core/service/branch.resolver';
import { BranchService } from '../core/service/branch.service';
import { EstablishmentResolver } from '../core/service/establishment.resolver';
import { EstablishmentService } from '../core/service/establishment.service';
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
    EstablishmentComponent,
    EstablishmentUpdateComponent,
    BranchComponent,
    BranchUpdateComponent,
  ],
  providers: [
    RoleService,
    EstablishmentService,
    EstablishmentResolver,
    BranchService,
    BranchResolver,
    UserResolver
  ],
  entryComponents: []
})

export class InvoicingModule { }
