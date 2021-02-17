import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  filter: any = {};


  constructor() { }

  ngOnInit() {
  }

  loadData() {

  }

}
