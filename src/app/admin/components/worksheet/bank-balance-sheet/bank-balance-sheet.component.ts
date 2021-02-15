import { Component, OnInit, ViewChild } from '@angular/core';
import jexcel from "jexcel";
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-bank-balance-sheet',
  templateUrl: './bank-balance-sheet.component.html',
  styleUrls: ['./bank-balance-sheet.component.scss']
})
export class BankBalanceSheetComponent implements OnInit {

  filter: any = {};
  custody_filter: any = {};
  data: any = [];
  expenses: any = [];
  banks: any = [];
  loading = false;
  total = 0;
  selectedBank: any = {};
  updateView: any;

  constructor(private globalService: GlobalService) {
    this.filter.bank_id = 0;
    this.updateView =() =>{ this.loadData() };
  }

  ngOnInit() {
    this.globalService.get('account/banks', this.filter).subscribe((res) =>{
      this.banks = res;
    });
    this.loadData();
  }

  setSelectBank() {
    this.banks.forEach(element => {
      if (element.id == this.filter.bank_id)
        this.selectedBank = element;
    });
  }

  loadData() {
    if (!this.filter.bank_id || !this.filter.date_from || !this.filter.date_to)
      return;
    this.loading = true;
    this.setSelectBank();
    this.globalService.get('account/bank-balances', this.filter).subscribe((res) =>{
      this.data = res;
      this.calculateTotal();
      this.create('');
      this.loading = false;
    });
  }

  sendExpense(object: any) {
    if (object.id)
      this.updateExpense(object);
    else
      this.createExpense(object);
  }

  updateExpense(object: any) {
    /*this.globalService.bank('account/incomes/update/'+object.id, object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
    });*/
  }

  createExpense(object: any) {
    /*this.globalService.bank('account/incomes/bank', object).subscribe((res: any) => {
      if (res.status == 1)
        this.loadData();
      //this.create('');
    });*/
  }

  create(text=null) {
    /*this.data.push({
      notes: text,//? text : Helper.trans('new expense')
      type: 'bank',
      bank_id: this.filter.bank_id
    });*/
  }

  remove(object: any, index) {
    /*var self = this;
    Message.confirm(Helper.trans('are you sure'), (res) => {
      self.globalService.bank('account/incomes/delete/'+object.id, object).subscribe((res: any) => {
        self.data.splice(index, 1);
        self.loadData();
      });
    });*/
  }

  calculateTotal() {
    this.total = 0;
    this.data.forEach(element => {
      this.total += element.balance;
    });
  }


}
