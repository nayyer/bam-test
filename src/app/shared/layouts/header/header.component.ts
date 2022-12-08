import {Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {DOCUMENT} from "@angular/common";
import {AppService} from "@core/root/app.service";
import {Theme} from "@core/interfaces/Theme";

import {TokenStorageService} from "@core/services/interceptors/token-storage.service";
import {UserInfo} from "@core/interfaces/User";

import {environment} from "@environment/environment";
import {Storage} from "@core/helpers/Storage";
import {Language} from "@core/interfaces/Language";

import {BaseComponent} from "@core/root/base.component";
import { AuthService } from 'src/app/auth/auth.service';

declare const Raychat: any;


@Component({
             selector   : 'app-header',
             templateUrl: './header.component.html',
             styleUrls  : ['./header.component.scss']
           })
export class HeaderComponent extends BaseComponent
{
  @Input() forceThemeShow: boolean = false;

  allLocales: any[]                                            = ['fa', 'en'];
  locales: any[]                                               = ['fa', 'en'];
  currentUrl: string                                           = '';
  term: string                                                 = '';
  locale: string                                               = environment.defaultLang;
  isLoading: boolean                                           = false;
  coins: Symbol[]                                              = [];


  iconsList: { name: string, url: string, literal?: string }[] = [];
  showResponsiveMenu: boolean                                  = false;
  showSearchBox: boolean                                       = false;


  get theme(): Theme
  {
    return this._appService.getTheme() || 'light';
  }

  get isMobileView(): boolean
  {
    return this._appService.isMobileView;
  }

  get showProgressBar(): boolean
  {
    return this._appService.showProgressBar;
  }

  get isAuthorized(): boolean
  {
    return this._tokenStorageService.isAuthorized();
  }

  get user(): UserInfo
  {
    return this._appService.userInfo;
  }

  get currentLocale(): Language
  {
    return this._appService.getLang();
  }

  get lang(): Language
  {
    return this._appService.lang || environment.defaultLang;
  }

  /**
   * make and get avatar src
   * */
  getAvatarSrc()
  {
    return `${this.user.avatar_id}`
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
    private router: Router,
    public _tokenStorageService: TokenStorageService,
    private _appService: AppService,
    private _authService: AuthService
  )
  {
    super();
    this.makeIcons();

  }

  ngOnInit(): void
  {
    this.getLanguages();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.getLanguages();
    });

  }

  makeIcons()
  {
    this._appService.addSVGIcon('direction-down-mid');
    this._appService.addSVGIcon('direction-left-mid');
    this._appService.addSVGIcon('moon-mid');
    this._appService.addSVGIcon('sun-mid');
    this._appService.addSVGIcon('logout-mid');
  }




  /**
   * get all languages
   * */
  getLanguages()
  {
    this.locale  = Storage.get(environment.languageKey);
    this.locales = this.allLocales.filter(item => item != this.locale);
  }


  changeLange(locale: string)
  {
    this._appService.setLang(locale)
    this.getLanguages();
  }


  /**
   * toggle the page theme
   * */
  changeTheme()
  {
    let theme: Theme = this.theme == 'light' ? 'dark' : 'light';
    this._appService.setTheme(theme);
  }

  /**
   * log out from the system
   * */
  logOut()
  {
    this._authService.SignOut();
  }


  /**
   * handle the top menu click event
   * @param {Menu} menu
   * */
  topMenuClickHandler()
  {

  }

  /**
   * open the profile menu
   * */
  openMenu()
  {

  }

  // /**
  //  * open the sub menu
  //  * @param {Menu} menu
  //  * */
  // openSubMenu(menu: Menu)
  // {
  //   if (menu.children)
  //   {
  //     this.activeSubMenu = menu;
  //   }
  //   else
  //   {
  //     this.router.navigate([menu.route]);
  //     this.showResponsiveMenu = false;
  //   }
  // }




}
