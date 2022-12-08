import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {Language, Theme} from "@core/interfaces/Theme";
import {DOCUMENT} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {UserInfo} from "@core/interfaces/User";

import {TranslateService} from "@ngx-translate/core";
import {environment} from "@environment/environment";
import {Storage} from "@core/helpers/Storage";
import {Icons} from "@shared/data/icons";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

import {Direction} from "@core/interfaces/Language";


import { TokenStorageService } from '@core/services/interceptors/token-storage.service';

@Injectable({
              providedIn: 'root'
            })
export class AppService
{
  dir: Direction                                  = 'rtl';
  userInfo: UserInfo                              = {};
  kycLevel: number                                = 0;
  showProgressBar: boolean                        = false;
  onThemeChanged: BehaviorSubject<any>            = new BehaviorSubject<any>(null);
  onLangChanged: BehaviorSubject<any>             = new BehaviorSubject<any>(null);
  onRunTimer: BehaviorSubject<number>             = new BehaviorSubject<number>(120);
  isMobileView: boolean                           = false;
  pageTitleKey: string                            = '';
  isHovered: boolean                              = false;
  isExchangePage: boolean                         = false;
  isFullModePage: boolean                         = false;
  isHomePage: boolean                             = false;
  isDownloadingUpdates: boolean                   = false;
  openProfileEditOnLoad: boolean                  = false;


  isRaychatReady: boolean                         = false;

  lang: Language                                  = 'fa';

  getThemeChange()
  {
    return this.onThemeChanged;
  }

  getLangChange()
  {
    return this.onLangChanged;
  }




  constructor(@Inject(PLATFORM_ID) private platformId: any,

              private _tokenService: TokenStorageService,
              private _router: Router,
              private translateService: TranslateService,
              private iconRegistry:MatIconRegistry,
              private sanitizer : DomSanitizer,

              @Inject(DOCUMENT) private document: Document)
  {

  }



  /**
   * trigger to set website theme
   * @param {Theme} theme
   * */
  setTheme(theme: Theme)
  {
    Storage.set(environment.themeKey, theme);
    this.document.body.classList.remove('light', 'dark');
    this.document.body.classList.add(theme);
    this.onThemeChanged.next(theme)
  }

  /**
   * trigger to set website theme
   * @param {string} language
   * */
  setLang(language: string)
  {
    // language = 'en'
    Storage.set(environment.languageKey, language);
    this.translateService.use(language);
    this.onLangChanged.next(language);
  }

  /**
   * @returns {Theme} the website theme
   * */
  getTheme(): Theme
  {
    return <Theme>Storage.get(environment.themeKey) || 'light';
  }

  /**
   * @returns {language} the website language
   * */
  getLang(): Language
  {
    //return 'fa';
    return <Language>Storage.get('lang') || 'fa';
  }

  signOut(): void
  {
    Storage.remove('user');
    this._router.navigate(['/auth']);
  }

  /**
   * add the icon from icon list svg files to use in mat-icon tag
   * @param {string} iconName
   * */
  addSVGIcon(iconName: string)
  {
    let index: number = Icons.findIndex(item => item == iconName);
    if (index != -1)
    {
      this.iconRegistry.addSvgIcon(Icons[index], this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/bitmax-icon/' + Icons[index] + '.svg'));
    }
  }

 

  unSubscribeInterval()
  {

  }
}
