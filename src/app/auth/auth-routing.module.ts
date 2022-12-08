import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "src/app/auth/auth.component";
import {SignInComponent} from "src/app/auth/sign-in/sign-in.component";
// import {ForgotPasswordComponent} from "src/app/auth/forgot-password/forgot-password.component";
import {SignUpComponent} from "src/app/auth/sign-up/sign-up.component";
import { VerifyEmailComponent } from './verify-email/verify-email.component';

export const routes: Routes = [
  {
    path     : '',
    component: AuthComponent,
    children : [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
         path: 'verify-email-address',
         component: VerifyEmailComponent
      },
    ]
  },

];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
          })
export class AuthRoutingModule {}
