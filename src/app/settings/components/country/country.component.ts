import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/shared/auth';
import { Crud } from 'src/app/shared/helpers/crud';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent extends Crud implements OnInit {

  constructor(public service: GlobalService) {
    super(service);
    //
    this.baseApiUrl = "admin/countries";
  }

  ngOnInit() {
    this.get();
  }

}
