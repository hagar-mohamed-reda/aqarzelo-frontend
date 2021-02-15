import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent extends SettingTemplate implements OnInit {


  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "nationalities";
    this.requiredFields = ['name'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
