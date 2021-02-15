import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout.component';
import { AuthGuardService } from './shared/middlewares/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'student',
        loadChildren: './student/student.module#StudentModule'
      },
      {
        path: 'academic',
        loadChildren: './academic/academic.module#AcademicModule'
      },
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      },
      {
        path: 'adminision',
        loadChildren: './adminision/adminision.module#AdminisionModule'
      },
      {
        path: 'military',
        loadChildren: './military/military.module#MilitaryModule'
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'users',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'affairs',
        loadChildren: './affairs/affairs.module#AffairsModule'
      },
      {
        path: 'card',
        loadChildren: './card/card.module#CardModule'
      },
     /* {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },

      {
        path: 'admin-users',
        loadChildren: './admin-users/admin-users.module#AdminUsersModule'
      },
      {
        path: 'app-users',
        loadChildren: './app-users/app-users.module#AppUsersModule'
      },
      {
        path: '**',
        component: PageNotFoundComponent,
        // redirectTo: 'dashboard',
        pathMatch: 'full'
      }*/
    ]
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    // redirectTo: 'admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: true,
        scrollPositionRestoration: 'enabled'
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
