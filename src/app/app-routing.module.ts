import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '@core/root/route-guard.service';

export const routes: Routes = [
  {
    path        : '',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate : [RouteGuard]
  },
  // {
  //   path        : 'panel',
  //   loadChildren: () => import('./features/panel/panel.module').then(m => m.PanelModule),
  //   canActivate : [PanelGuard]
  // },
  {
    path        : 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  // {
  //   path        : 'error',
  //   loadChildren: () => import('./features/error/error.module').then(m => m.ErrorModule)
  // },


  // {path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [              RouterModule.forRoot(routes, {

    scrollPositionRestoration: 'enabled',

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
