import {Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";

import {TokenStorageService} from "@core/services/interceptors/token-storage.service";
import {AppService} from "@core/root/app.service";


@Component(
  {
    selector   : 'app-auth',
    templateUrl: './auth.html',
    styleUrls  : ['auth.scss']
  }
)
export class AuthComponent
{

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              @Inject(DOCUMENT) private document: Document,
              private _router: Router,
              private _appService: AppService,
              private _tokenService: TokenStorageService,
              )
  {
    this.makeIcons()
  }

  ngOnInit()
  {
    /**
     * check user login state , redirect to panel if the user has token
     * */
    if (this._tokenService.isAuthorized())
    {
      this._router.navigate(['/'])
    }

  }

  makeIcons()
  {
    this._appService.addSVGIcon('mobile-mid');
    this._appService.addSVGIcon('eye-disable-mid');
    this._appService.addSVGIcon('eye-mid');
    this._appService.addSVGIcon('idcard-mid');
    this._appService.addSVGIcon('calendar-mid');
    this._appService.addSVGIcon('user3-mid');
    this._appService.addSVGIcon('remove-thin');
    this._appService.addSVGIcon('check-thin');
  }


  ngOnDestroy()
  {
    this._appService.unSubscribeInterval();
  }

}
