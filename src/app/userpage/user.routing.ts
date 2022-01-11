import { Routes } from '@angular/router';
import { CompanyComponent } from './company.component';

import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pages/user',
        component: UserComponent
      },
      {
        path: 'pages/company',
        component: CompanyComponent
      }
    ]
  }
];
