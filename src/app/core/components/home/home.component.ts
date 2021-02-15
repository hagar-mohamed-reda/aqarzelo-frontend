import { Component, OnInit } from '@angular/core';
import { ApplicationSettingService } from 'src/app/adminision/services/application-setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isClosed = false;
  applicationSetting = ApplicationSettingService;

  constructor() {
    console.log(this.applicationSetting.SETTINGS);
  }

  ngOnInit() {
  }

}
