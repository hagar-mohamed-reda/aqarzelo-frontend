import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './shared/interceptors';
import { SharedModule } from './shared/shared.module';
import { AuthGuestService } from './shared/middlewares/auth-guest.service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthService } from './shared/services/auth.service';
import { LayoutComponent } from './core/layout.component';
import { AppComponent } from './core/app.component';
import { AuthComponent } from './core/auth.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { TranslationService } from './shared/services/translation.service';
import { Cache } from './shared/cache';
import { Translation } from './shared/translation';
import { LevelService } from './account/services/level.service';
import { DivisionService } from './account/services/division.service';
import { TermService } from './account/services/term.service';
import { Message } from './shared/message';
import { ApplicationSettingService } from './adminision/services/application-setting.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { DataTablesModule } from '../../node_modules/angular-datatables';
import { SystemLabelComponent } from './core/components/system-label/system-label.component';
import { UserService } from './user/services/user.service';
import { RoleService } from './user/services/role.service';

@NgModule({
  declarations: [
    LayoutComponent,
    AuthComponent,
    AppComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    SystemLabelComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      progressBar: true,
      closeButton: true,
      enableHtml: true,
    }),
    AppRoutingModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [
    httpInterceptorProviders,
    ApplicationSettingService,
    TranslationService,
    LevelService,
    DivisionService,
    TermService,
    AuthService,
    AuthGuestService,
    UserService,
    RoleService,
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static doc: any = document;

  constructor() {
    var self = this;
    /*
    self.reloadIfConsoleOpen();

    document.oncontextmenu = function(ev){
      ev.preventDefault();
    };

    document.onmousemove = function(ev){
      self.reloadIfConsoleOpen();
    };
*/
  }

  reloadIfConsoleOpen() {
    if (this.isConsoleOpen()) {
        window.location.href = "https://www.youtube.com/watch?v=6YCq549gdT0";
    };
  }

  isConsoleOpen() {
    var startTime: any = new Date();
    debugger;
    var endTime: any = new Date();

    return endTime - startTime > 100;
  }



}
