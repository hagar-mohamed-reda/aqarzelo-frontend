import { Component, OnInit, ViewChild } from '@angular/core';
import jexcel from "jexcel";
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-daily-sheet',
  templateUrl: './daily-sheet.component.html',
  styleUrls: ['./daily-sheet.component.scss']
})
export class DailySheetComponent implements OnInit {

  filter: any = {};
  stores: any = [];
  data: any = [];
  expenses: any = [];
  loading = false;
  total = 0;

  constructor(private globalService: GlobalService) {
    this.filter.store_id = 0;
  }

  ngOnInit() {
    this.globalService.get('account/trees', this.filter).subscribe((res) =>{
      this.expenses = res;
    });
    this.globalService.get('account/stores', this.filter).subscribe((res) =>{
      this.stores = res;
    });
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.globalService.get('account/dailys', this.filter).subscribe((res) =>{
      this.data = res;
      this.calculateTotal();
      this.create('');
      this.loading = false;
    });
  }

  getSelectedExpenses(id) {
    this.expenses.forEach(element => {
      if (element.id == id)
        return element;
    });

    return null;
  }

  getIndexWithId(id) {
    this.data.forEach((element, index, arr) => {
      if (element.id == id)
        return index;
    });

    return null;
  }

  sendExpense(object: any) {
    if (object.id)
      this.updateExpense(object);
    else
      this.createExpense(object);
  }

  updateExpense(object: any) {
    this.globalService.store('account/dailys/update/'+object.id, object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
    });
  }

  createExpense(object: any) {
    this.globalService.store('account/dailys/store', object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
      //this.create('');
    });
  }

  create(text=null) {
    this.data.push({
      notes: text,//? text : Helper.trans('new expense')
      type: 'store',
      store_id: this.filter.store_id
    });
  }

  remove(object: any, index) {
    var self = this;
    Message.confirm(Helper.trans('are you sure'), (res) => {
      self.globalService.store('account/dailys/delete/'+object.id, object).subscribe((res: any) => {
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
