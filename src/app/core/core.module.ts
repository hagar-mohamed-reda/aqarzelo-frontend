import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {NavBarComponent} from './components/navbar/navbar.component';
import { SystemLabelComponent } from './components/system-label/system-label.component';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    MainPageComponent 
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule {
}
