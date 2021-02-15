import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingService as GovernmentService } from '../../services/setting.service';
import { SettingService as CityService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent extends SettingTemplate implements OnInit {

  gover = null;
  city = null;
  selectedCountry: any = {};
  selectedGovernment: any = {};

  constructor(public settingService: SettingService,
    public governmentService: GovernmentService,
    public cityService: CityService) {
    super(settingService);
    this.baseUrl = "countries";

    this.settingService.baseUrl = "countries";
    this.requiredFields = ['name'];
    this.get();

    // init government
    this.gover = new SettingTemplate(this.governmentService);
    this.gover.requiredFields = ['name', 'country_id'];
    this.gover.baseUrl = "governments";
    //governmentService.baseUrl = "governments";
    this.gover.get();

    // init city
    this.city = new SettingTemplate(this.cityService);
    this.city.baseUrl = "cities";
    this.city.requiredFields = ['name', 'government_id'];
    this.city.get();

  }

  ngOnInit() {
  }

}
