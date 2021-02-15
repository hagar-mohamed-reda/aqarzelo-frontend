import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import jexcel from "jexcel";
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-custody-sheet',
  templateUrl: './custody-sheet.component.html',
  styleUrls: ['./custody-sheet.component.scss']
})
export class CustodySheetComponent implements OnInit, OnChanges {


  @Input() filter: any = {};
  @Input() updateDate: any;
  data: any = [];
  stores: any = [];
  resources: any = [];
  @Input() loading = false;
  @Input() store_id;
  total = 0;
  selectedStore: any = {};

  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
    this.globalService.get('account/stores', this.filter).subscribe((res) =>{
      this.stores = res;
    });
    this.loadData();
  }


  loadData() {
    if (!this.filter.store_id)
      return;
    this.loading = true;
    this.globalService.get('account/custodys', this.filter).subscribe((res) =>{
      this.data = res;
      this.calculateTotal();
      this.create('');
      this.loading = false;
      if (this.updateDate)
        this.updateDate();
    });
  }

  sendResource(object: any) {
    object.store_id = this.store_id;
    if (object.id)
      this.updateResource(object);
    else
      this.createResource(object);
  }

  updateResource(object: any) {
    this.globalService.store('account/custodys/update/'+object.id, object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
    });
  }

  createResource(object: any) {
    this.globalService.store('account/custodys/store', object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
      //this.create('');
    });
  }

  create(text=null) {
    this.data.push({
      name:  '',
      store_id: this.filter.store_id
    });
  }

  remove(object: any, index) {
    var self = this;
    Message.confirm(Helper.trans('are you sure'), (res) => {
      self.globalService.store('account/custodys/delete/'+object.id, object).subscribe((res: any) => {
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

  ngOnChanges(changes): void {
    this.loadData();
  }
}
