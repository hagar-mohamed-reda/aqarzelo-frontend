import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-parent-job',
  templateUrl: './parent-job.component.html',
  styleUrls: ['./parent-job.component.scss']
})
export class ParentJobComponent extends SettingTemplate implements OnInit {


  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "parent_jobs";
    this.requiredFields = ['name'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
