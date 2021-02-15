import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent extends SettingTemplate implements OnInit {

  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "languages";
    this.requiredFields = ['name'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
