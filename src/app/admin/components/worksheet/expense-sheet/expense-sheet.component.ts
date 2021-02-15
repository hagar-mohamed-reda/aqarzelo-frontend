import { Component, OnInit, ViewChild } from '@angular/core';
import jexcel from "jexcel";
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-expense-sheet',
  templateUrl: './expense-sheet.component.html',
  styleUrls: ['./expense-sheet.component.scss']
})
export class ExpenseSheetComponent implements OnInit {

  filter: any = {};
  stores: any = [];
  data: any = [];
  total = 0;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.get('account/stores', this.filter).subscribe((res) =>{
      this.stores = res;
    });
    this.loadData();
  }

  loadData() {
    this.globalService.get('account/trees', this.filter).subscribe((res) =>{
      this.data = res;
      this.calculateTotal();
      this.create('');
      this.initSpreadSheet(res);
    });
  }

  initSpreadSheet(data) {
    jexcel.self = this;
    jexcel(document.getElementById('spreadsheet'), {
      data:data,
      columns: [
          {
              type: 'numeric',
              title: Helper.trans('code'),
              width: '100'
          },
          {
              type: 'text',
              title: Helper.trans('trees'),
              width: '300'
          },
          {
              type: 'numeric',
              title: Helper.trans('with document'),
              width: '300'
          }
      ],
      onchange: this.onChange,
    });
  }

  onChange(instance, cell, x, y, value) {
    //return console.log(jexcel.data);
    console.log(cell);
    let row = jexcel.self.data[parseInt(y)];

    if (row) {
      console.log(row);
      jexcel.self.updateExpense({
        id: row.id,
        text: jexcel.getColumnNameFromId([x,1])
      });
    } else {
      jexcel.self.createExpense({
        id: jexcel.getColumnNameFromId([x,0]),
        text: jexcel.getColumnNameFromId([x,1])
      });
    }
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
    this.globalService.store('account/trees/update/'+object.id, object).subscribe((res: any) => {
      let index = this.getIndexWithId(res.data.id);
      if (index)
        this.data[index].id = res.data.id;

      this.loadData();
    });
  }

  createExpense(object: any) {
    this.globalService.store('account/trees/store', object).subscribe((res: any) => {
      let index = this.getIndexWithId(res.data.id);
      if (index)
        this.data[index].id = res.data.id;

      this.loadData();
      //this.create('');
    });
  }

  create(text=null) {
    this.data.push({
      text: text//? text : Helper.trans('new expense')
    });
  }

  remove(object: any, index) {
    var self = this;
    Message.confirm(Helper.trans('are you sure'), (res) => {
      self.globalService.store('account/trees/delete/'+object.id, object).subscribe((res: any) => {
        self.data.splice(index, 1);
        self.loadData();
      });
    });
  }

  calculateTotal() {
    this.total = 0;
    this.data.forEach(element => {
      this.total += element.total;
    });
  }



}
