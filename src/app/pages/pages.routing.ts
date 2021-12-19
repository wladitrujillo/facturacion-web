import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

//se define las rutas de la autentificación facilitando la movilidad entre pantallas inicializandolas
export const PagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'register',
        component: RegisterComponent
    }, {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
    },
    {
        path: 'activate-account/:userId',
        component: ActivateAccountComponent
    }
];
