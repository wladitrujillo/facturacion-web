import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { CompanyComponent } from './company.component';
import { UserResolver } from '../core/service/user.resolver';
import { FieldErrorComponent } from './field-error/field-error.component';
import { CompanyResolver } from '../core/service/company.resolver';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [UserComponent, CompanyComponent, FieldErrorComponent],
    providers: [
        UserResolver,
        CompanyResolver
    ]
})

export class UserModule { }
