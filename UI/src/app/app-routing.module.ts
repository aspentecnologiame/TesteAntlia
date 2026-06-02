import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: GuestComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./demo/pages/authentication/auth-signin/auth-signin.component').then((c) => c.AuthSigninComponent)
      }
    ]
  },
  {
    path: 'register',
    component: GuestComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./demo/pages/authentication/auth-signup/auth-signup.component').then((c) => c.AuthSignupComponent)
      }
    ]
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./demo/dashboard/dashboard.component').then((c) => c.DashboardComponent)
      },
      {
        path: 'movimentos-manuais',
        loadComponent: () => import('./movimentos-manuais/movimentos-manuais.component').then((c) => c.MovimentosManuaisComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
