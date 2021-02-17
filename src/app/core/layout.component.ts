import {AfterViewChecked, Component, Inject, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { Auth } from '../shared/auth';
import { Router } from '../../../node_modules/@angular/router';
import { TranslationService } from '../shared/services/translation.service';
import { Translation } from '../shared/translation';
import { Cache } from '../shared/cache';
import { Request } from '../shared/request';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements  OnInit, OnChanges{

  constructor(
  private router: Router,
  private translationService: TranslationService) {
    Translation.TRANSLATION_DATA = Cache.get(Translation.TRANSLATION_CACHE_KEY);
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
