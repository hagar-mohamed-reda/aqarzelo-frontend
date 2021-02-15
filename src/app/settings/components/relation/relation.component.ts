import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss']
})
export class RelationComponent extends SettingTemplate implements OnInit {

  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "relations";
    this.requiredFields = ['name'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
