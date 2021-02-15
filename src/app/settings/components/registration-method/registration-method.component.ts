import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-registration-method',
  templateUrl: './registration-method.component.html',
  styleUrls: ['./registration-method.component.scss']
})
export class RegistrationMethodComponent extends SettingTemplate implements OnInit {


  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "registration_methods";
    this.requiredFields = ['name'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
