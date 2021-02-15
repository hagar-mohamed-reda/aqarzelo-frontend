import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { TranslationComponent } from "./translation/translation.component";
import { SharedModule } from "../shared/shared.module";
import { RegisterationStatusComponent } from './registeration-status/registeration-status.component';
import { MatSlideToggleModule } from '@angular/material';
import { CountryComponent } from './components/country/country.component';
import { AcademicYearComponent } from './components/academic-year/academic-year.component';
import { DivisionComponent } from './components/division/division.component';
import { QualificationComponent } from './components/qualification/qualification.component';
import { RegistrationMethodComponent } from './components/registration-method/registration-method.component';
import { CaseConstraintComponent } from './components/case-constraint/case-constraint.component';
import { NationalityComponent } from './components/nationality/nationality.component';
import { LanguageComponent } from './components/language/language.component';
import { ParentJobComponent } from './components/parent-job/parent-job.component';
import { RelationComponent } from './components/relation/relation.component';
import { StudentCodeSeriesComponent } from './components/student-code-series/student-code-series.component';
import { PermissionComponent } from './components/permission/permission.component';

@NgModule({
  declarations: [
    SettingsComponent,
    TranslationComponent,
    RegisterationStatusComponent,
    CountryComponent,
    AcademicYearComponent,
    DivisionComponent,
    QualificationComponent,
    RegistrationMethodComponent,
    CaseConstraintComponent,
    NationalityComponent,
    LanguageComponent,
    ParentJobComponent,
    RelationComponent,
    StudentCodeSeriesComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    DataTablesModule,
    MatSlideToggleModule
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
