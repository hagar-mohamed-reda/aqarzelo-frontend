import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { TranslationComponent } from './translation/translation.component';
import { PermissionComponent } from './components/permission/permission.component';
import { Auth } from '../shared/auth';
import { AuthGuestService } from '../shared/middlewares/auth-guest.service';
import { CityComponent } from './components/city/city.component';
import { CountryComponent } from './components/country/country.component';

const routes: Routes = [
  {
    // RegisterationMethodsModule
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: "country",
        //canActivate: [AuthGuestService],
        data: {can: Auth.can('country_read')},
        component: CountryComponent
      },
      {
        path: "translations",
        canActivate: [AuthGuestService],
        data: {can: Auth.can('translation_read')},
        component: TranslationComponent
      },
      {
        path: "permissions",
        canActivate: [AuthGuestService],
        data: {can: Auth.can('permission_read')},
        component: PermissionComponent
      },



    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
