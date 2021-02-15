import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminComponent } from './admin.component';
import { Auth } from '../shared/auth';
import { AuthGuestService } from '../shared/middlewares/auth-guest.service';

const routes: Routes = [
  {
    path: 'report/payment-details',
    canActivate: [AuthGuestService],
    data: {can: Auth.can('payment_detail_report')},
    component: null
  },
  {
    path: "setting",
    component: AdminComponent,
    children: [
      {
        path: 's',
        canActivate: [AuthGuestService],
        data: {can: Auth.can('account_setting')},
        component: null
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
