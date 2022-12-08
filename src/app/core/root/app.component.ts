

import {Component, HostListener, Inject, PLATFORM_ID} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {AppService} from "@core/root/app.service";
import {Theme} from "@core/interfaces/Theme";
// import {HttpClient} from "@angular/common/http";


import {NavigationEnd, Router} from "@angular/router";
import {TokenStorageService} from "@core/services/interceptors/token-storage.service";
import {Direction} from "@angular/cdk/bidi";

import {MatDialog} from "@angular/material/dialog";

import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

import {Storage} from "@core/helpers/Storage";
import {environment} from "@environment/environment";

declare const Raychat: any;

@Component({
             selector   : 'app-root',
             templateUrl: './app.component.html',
             styleUrls  : ['./app.component.scss']
           })
export class AppComponent
{
  get dir(): Direction
  {
    //return Storage.get(environment.languageKey) == 'en' ? 'ltr' : 'rtl'
    return 'rtl'
  }

  get lang(): string
  {
    //return Storage.get(environment.languageKey) || environment.defaultLang
    return 'fa'
  }


  get isExchangePage(): boolean
  {
    return this._appService.isExchangePage;
  }

  get isFullModePage(): boolean
  {
    return this._appService.isFullModePage;
  }

  get isHomePage(): boolean
  {
    return this._appService.isHomePage;
  }

  get isMobileView(): boolean
  {
    return this._appService.isMobileView;
  }

  get isAuthorized(): boolean
  {
    return this._tokenStorageService.isAuthorized();
  }

  get isDownloadingUpdates(): boolean
  {
    return this._appService.isDownloadingUpdates;
  }

  constructor(
    private translateService: TranslateService,
    private _appService: AppService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    public _tokenStorageService: TokenStorageService,
    @Inject(DOCUMENT) private document: Document,
  )
  {
    this.checkRoute();
    this.translateService.stream('DIR').subscribe((dir: any) => {
      this.directionChanged(dir);
    });


  }


  /**
   * subscribe the route change to remove side menu in exchange page
   * */
  checkRoute()
  {
    this._router.events.subscribe((result:any) => {
      if (result instanceof NavigationEnd)
      {
        let specialRoues: string[]  = ['quick-order', 'exchange', 'profile', 'analysis', 'quick-buy', 'panel/accounting/deposit', 'panel/accounting/withdraw', 'panel/referral', 'panel/profile'];
        this._appService.isHomePage = result.url === '/' || result.url === '/auth/sign-up' || result.url === '/help/exchange';
        if (!this._appService.isHomePage)
        {
          this._appService.isExchangePage = result.url.indexOf(specialRoues[0]) != -1 || result.url.indexOf(specialRoues[1]) != -1 || result.url.indexOf(specialRoues[2]) != -1 || result.url.indexOf(
            specialRoues[3]) != -1 || result.url.indexOf(specialRoues[5]) != -1 || result.url.indexOf(specialRoues[6]) != -1 || result.url.indexOf(specialRoues[7]) != -1;
          this._appService.isFullModePage = result.url.indexOf(specialRoues[1]) != -1 || result.url.indexOf(specialRoues[2]) != -1 || result.url.indexOf(specialRoues[3]) != -1;
        }
        else
        {
          this._appService.isExchangePage = false;
          this._appService.isFullModePage = false;
        }
      }
    })
  }

  ngOnInit()
  {

    this.setCollapseState();

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(this.lang);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this._appService.setLang(this.lang);

    this._getTheme();

    this.setCollapseState();

    this._appService.getLangChange().subscribe((event:any) => {
      if (event)
      {
        this._appService.lang = event;

      }
    })

    /**
     * listen to chat widget ready state
     * */
    window.addEventListener('raychat_ready', (ets: any) => {
      this._appService.isRaychatReady = true;
      //open chat box in first view
      if (Raychat)
      {
        if (this.isAuthorized)
        {
          let user:any=this._tokenStorageService.decodeToken( Storage.get(environment.accessTokenKey))
          if(Object.keys(user).length){
            Raychat.setUser(
              {
                email     : user.email?user.email:'',
                name      : '',
                about     : '',
                phone     : user.phone_number?user.phone_number:'',
                avatar    : '',
                updateOnce: true
              }
            );
          }

        }
        if (!Storage.get('showChatBox') && !this.isMobileView)
        {
          //Raychat.open();
          //Storage.set('showChatBox', true)
        }

      }
    });
  }


  ngAfterViewInit()
  {
    this.document.addEventListener('online', this.onNetworkStatusChange.bind(this));
    this.document.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }

  /**
   *@returns network status
   * */
  onNetworkStatusChange(): void
  {
    console.log('offline ' + !navigator.onLine);
  }


  /**
   * listener for window resize for set collapse state
   * */
  @HostListener('window:resize', ['$event'])
  onResize(event: any)
  {
    this.setCollapseState(event.target.innerWidth);
  }

  /**
   * set menu collapse state by window size
   * */
  setCollapseState(windowWidth: number = 0)
  {
    if (isPlatformBrowser(this.platformId) && window)
    {
      if (!windowWidth)
      {
        windowWidth = window.innerWidth;
      }
      if (windowWidth < 992)
      {
        this._appService.isMobileView = true;
      }
      else
      {
        this._appService.isMobileView = false;
      }
    }

  }




  private directionChanged(dir: Direction): void
  {
    const htmlTag        = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    this._appService.dir = dir;
    htmlTag.dir          = this._appService.dir;
    htmlTag.lang         = this._appService.dir === 'rtl' ? 'fa' : 'en';
  }

  private _getTheme()
  {
    let theme: Theme = this._appService.getTheme() || 'light';
    //check render mode to use storage safely
    if (isPlatformBrowser(this.platformId))
    {
      this.document.body.classList.remove('light', 'dark');
      this.document.body.classList.add(theme);
    }
  }

}

