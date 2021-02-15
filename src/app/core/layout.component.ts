import {AfterViewChecked, Component, Inject, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/platform-browser";
import { Auth } from '../shared/auth';
import { Router } from '../../../node_modules/@angular/router';
import { TranslationService } from '../shared/services/translation.service';
import { TermService } from '../account/services/term.service';
import { DivisionService } from '../account/services/division.service';
import { LevelService } from '../account/services/level.service';
import { ApplicationSettingService } from '../adminision/services/application-setting.service';
import { Translation } from '../shared/translation';
import { Cache } from '../shared/cache';
import { Request } from '../shared/request';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements AfterViewChecked  ,OnInit, OnChanges{

  constructor(@Inject(DOCUMENT)
  private document: Document,
  private router: Router,
  private translationService: TranslationService,
  private levelService: LevelService,
  private termService: TermService,
  private divisionService: DivisionService,
  private applicationSettingService: ApplicationSettingService) {
    Translation.TRANSLATION_DATA = Cache.get(Translation.TRANSLATION_CACHE_KEY);
  }

  ngAfterViewChecked(): void {
  }

  watchUser() {
    console.log(Auth.getApiToken());
    if (!Auth.getApiToken())
      this.router.navigate(['/login'], {
      }).then().catch();
  }

  ngOnInit() {
    //Cache.set(Translation.TRANSLATION_CACHE_KEY, r);
    Request.addToQueue({observer: this.translationService.get(), action: (r)=>{
      //Cache.remove(Translation.TRANSLATION_CACHE_KEY);
      //Cache.set(Translation.TRANSLATION_CACHE_KEY, r);
      Translation.TRANSLATION_DATA = r;
    }});
    Request.addToQueue({observer: this.divisionService.get(), action: (r)=>{
      Cache.remove(DivisionService.DIVISION_PREFIX);
      Cache.set(DivisionService.DIVISION_PREFIX, r);
    }});
    Request.addToQueue({observer: this.termService.get(), action: (r)=>{
      Cache.remove(TermService.TERPM_PREFIX);
      Cache.set(TermService.TERPM_PREFIX, r);
    }});

    // load all requests in the queueue
    console.log("request count : " + Request.queue.length);
    Request.fire();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.watchUser();
  }

  init() {
  }


}
