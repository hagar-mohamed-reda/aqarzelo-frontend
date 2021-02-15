import { Component, OnInit } from '@angular/core';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { Auth } from 'src/app/shared/auth';
import { Cache } from 'src/app/shared/cache';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { AccountSettingService } from '../../services/account-setting.service';
import { StoreService } from '../../services/store.service';
import { TermService } from '../../services/term.service';

@Component({
  selector: 'app-old-balance',
  templateUrl: './old-balance.component.html',
  styleUrls: ['./old-balance.component.scss']
})
export class OldBalanceComponent implements OnInit {

  breadcrumbList: any = [];
  oldBalanceSetting: any = {};
  termSetting: any = {};

  stores: any = [];
  terms: any = [];

  isSubmittedOldbalance = false;
  isSubmittedTerm = false;

  constructor(
    private storeService: StoreService,
    private accountSettingService: AccountSettingService,
    private systemSettingServie: SystemSettingService) {

    // init breadcrum
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: Helper.trans('academic_years_expenses')}
    ];
  }

  updateSetting(object, loadding) {
    loadding = true;
    this.isSubmittedOldbalance = true
    this.accountSettingService.update(object).subscribe((r: any) => {
      if (r.status == 1) {
        Message.success(r.message);
      } else {
        Message.error(r.message);
      }
      loadding = false;
      this.isSubmittedOldbalance = false
    });
  }

  // change old balance store methods
  loadStores() {
    this.storeService.get().subscribe((r) => {
      this.stores = r;
    });
  }

  loadOldBalanceSettings() {
    this.accountSettingService.get().subscribe((r: any) => {
      r.forEach(element => {
        if (element.id == 1) {
          this.oldBalanceSetting = element;
        }
        if (element.id == 6) {
          this.termSetting = element;
        }
      });
    });
  }

  updateOldBalanceSetting() {
    this.updateSetting(this.oldBalanceSetting, this.isSubmittedOldbalance);
  }

  // change term methods

  loadTerms() {
    this.terms = Cache.get(TermService.TERPM_PREFIX);
  }

  loadCurrentTerm() {
    this.systemSettingServie.getSystemSetting().subscribe((res: any) => {
      this.termSetting = res['current_term'];
    });
  }

  updateTerm() {
    this.updateSetting(this.termSetting, this.isSubmittedTerm);
  }


  ngOnInit() {
    this.loadOldBalanceSettings();
    //this.loadCurrentTerm();
    this.loadTerms();
    this.loadStores();
  }

}
