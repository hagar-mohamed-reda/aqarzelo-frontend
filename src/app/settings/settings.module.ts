import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { TranslationComponent } from "./translation/translation.component";
import { SharedModule } from "../shared/shared.module";
import { MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatSliderModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { PermissionComponent } from './components/permission/permission.component';
import { CityComponent } from './components/city/city.component';
import { CountryComponent } from './components/country/country.component';
import { GoogleChartsModule } from "angular-google-charts";

@NgModule({
  declarations: [
    SettingsComponent,
    TranslationComponent,
    PermissionComponent,
    CityComponent,
    CountryComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
    GoogleChartsModule,
    MatTabsModule
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
