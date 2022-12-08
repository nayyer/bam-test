import {Component} from '@angular/core';
import {Theme} from "@core/interfaces/Theme";
import {AppService} from "@core/root/app.service";
import {environment} from "@environment/environment";

import {TokenStorageService} from "@core/services/interceptors/token-storage.service";

@Component({
             selector   : 'app-footer',
             templateUrl: './footer.html',
             styleUrls  : ['./footer.scss'],

           })
export class FooterComponent
{

  // socialItems: { iconClass: string, iconUrl?: string, link: string }[] = [
  //   {
  //     link     : environment.instagram,
  //     iconClass: 'instagram-mid'
  //   },
  //   {
  //     link     : environment.twitter,
  //     iconClass: 'twitter-mid'
  //   },
  //   {
  //     link     : environment.telegram,
  //     iconClass: 'telegram-mid'
  //   },
  //   {
  //     link     : environment.linkedin,
  //     iconClass: 'linkedin-mid'
  //   },

  //   //{
  //   //  link:'',
  //   //  iconUrl:'/assets/images/home/aparat.png'
  //   //},


  // ]


  get theme(): Theme
  {
    return this._appService.getTheme() || 'light';
  }
  get isAuthorized(): boolean
  {
    return this._tokenStorageService.isAuthorized();
  }

  constructor(private _appService: AppService, public _tokenStorageService: TokenStorageService,)
  {
    this.makeIcons()
  }

  makeIcons()
  {

  }
}
