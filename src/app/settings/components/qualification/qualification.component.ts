import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/account/services/level.service';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';
import { Cache } from 'src/app/shared/cache';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent extends SettingTemplate implements OnInit {

  qualificationType = null;
  academicYears: any = [];
  levels: any = [];


  constructor(public settingService: SettingService,
    public qualificationTypeService: SettingService) {
    super(settingService);
    this.baseUrl = "qualifications";
    this.settingService.baseUrl = "qualifications";
    this.requiredFields = ['name', 'grade'];
    this.get();


    // init qualification type
    this.qualificationType = new SettingTemplate(this.qualificationTypeService);
    this.qualificationType.baseUrl = "qualification_types";
    this.qualificationType.requiredFields = ['name', 'level_id', 'academic_year_id', 'qualification_id', 'grade'];
    this.qualificationType.get();

  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.academicYears = ApplicationSettingService.ACADEMIC_YEARS;
  }

}
