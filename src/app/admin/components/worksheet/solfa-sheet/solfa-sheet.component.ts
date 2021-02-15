import { Component, OnInit, ViewChild } from '@angular/core';
import jexcel from "jexcel";
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-solfa-sheet',
  templateUrl: './solfa-sheet.component.html',
  styleUrls: ['./solfa-sheet.component.scss']
})
export class SolfaSheetComponent implements OnInit {

  filter: any = {};
  data: any = [];
  total = 0;
  stores: any = [];
  loading: any = false;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.get('account/stores').subscribe((res) =>{
      this.stores = res;
    });
    this.loadData();
  }

  loadData() {
    if (!this.filter.store_id)
      return;
    this.loading = true;
    this.globalService.get('account/solfas', this.filter).subscribe((res) =>{
      this.data = res;
      this.loading = false;
      this.calculateTotal();
      this.create('');
    });
  }

  sendResource(object: any) {
    if (object.id)
      this.updateResource(object);
    else
      this.createResource(object);
  }

  updateResource(object: any) {
    this.globalService.store('account/solfas/update/'+object.id, object).subscribe((res: any) => {
      if (res.status == 1)
      this.loadData();
    });
  }

  createResource(object: any) {
    this.globalService.store('account/solfas/store', object).subscribe((res: any) => {
      if (res.status == 1)
      this.loadData();
      //this.create('');
    });
  }

  create(text=null) {
    this.data.push({
      store_id: this.filter.store_id
    });
  }

  remove(object: any, index) {
    var self = this;
    Message.confirm(Helper.trans('are you sure'), (res) => {
      self.globalService.store('account/solfas/delete/'+object.id, object).subscribe((res: any) => {
        self.data.splice(index, 1);
        self.loadData();
      });
    });
  }

  calculateTotal() {
    this.total = 0;
    this.data.forEach(element => {
      this.total += element.value;
    });
  }


}
