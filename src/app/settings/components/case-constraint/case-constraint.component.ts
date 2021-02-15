import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-case-constraint',
  templateUrl: './case-constraint.component.html',
  styleUrls: ['./case-constraint.component.scss']
})
export class CaseConstraintComponent extends SettingTemplate implements OnInit {

  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "case_contraints";
    this.requiredFields = ['name'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
