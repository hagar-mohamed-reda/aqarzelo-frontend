import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { TranslationComponent } from './translation/translation.component';
import { RegisterationStatusComponent } from './registeration-status/registeration-status.component';
import { CountryComponent } from './components/country/country.component';
import { AcademicYearComponent } from './components/academic-year/academic-year.component';
import { DivisionComponent } from './components/division/division.component';
import { QualificationComponent } from './components/qualification/qualification.component';
import { RegistrationMethodComponent } from './components/registration-method/registration-method.component';
import { CaseConstraintComponent } from './components/case-constraint/case-constraint.component';
import { LanguageComponent } from './components/language/language.component';
import { NationalityComponent } from './components/nationality/nationality.component';
import { ParentJobComponent } from './components/parent-job/parent-job.component';
import { RelationComponent } from './components/relation/relation.component';
import { StudentCodeSeriesComponent } from './components/student-code-series/student-code-series.component';
import { PermissionComponent } from './components/permission/permission.component';
import { Auth } from '../shared/auth';
import { AuthGuestService } from '../shared/middlewares/auth-guest.service';

const routes: Routes = [
  {
    // RegisterationMethodsModule
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: "country",
        component: CountryComponent
      },
      {
        path: "academic-year",
        component: AcademicYearComponent
      },
      {
        path: "division",
        component: DivisionComponent
      },
      {
        path: "qualification",
        component: QualificationComponent
      },
      {
        path: "registration-method",
        component: RegistrationMethodComponent
      },
      {
        path: "case-constraint",
        component: CaseConstraintComponent
      },
      {
        path: "language",
        component: LanguageComponent
      },
      {
        path: "nationality",
        component: NationalityComponent
      },
      {
        path: "parent-job",
        component: ParentJobComponent
      },
      {
        path: "relation",
        component: RelationComponent
      },
      {
        path: "student-code-series",
        component: StudentCodeSeriesComponent
      },
      {
        path: "registration-status",
        canActivate: [AuthGuestService],
        data: {can: Auth.can('registeration_status')},
        component: RegisterationStatusComponent
      },
      {
        path: "translations",
        component: TranslationComponent
      },
      {
        path: "permissions",
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
