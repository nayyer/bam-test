import {Component,OnInit} from "@angular/core";

import {TranslateService} from "@ngx-translate/core";
import {TokenStorageService} from "@core/services/interceptors/token-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "src/app/auth/auth.service";
import {environment} from "@environment/environment";
import {Subscription,takeUntil} from "rxjs";
import {StringHelper} from "@core/helpers/StringHelper";
import {AppService} from "@core/root/app.service";
import { BaseComponent } from '@core/root/base.component';
import {FloatLabelType} from '@angular/material/form-field';
@Component(
  {
    selector   : 'app-sign-in',
    templateUrl: 'sign-in.html',
    styleUrls  : ['sign-in.scss']
  }
)
export class SignInComponent extends BaseComponent implements OnInit
//export class SignInComponent
{
  emailRegex: string = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
  floatLabelType:FloatLabelType = 'always' as FloatLabelType;
  isPasswordVisible: boolean = false;
  mode: 'login' | 'otp'                                                   = 'login';
  recaptchaSubscription: Subscription                                     = new Subscription();
  isChecking: boolean                                                     = false;
  isCheckingLogin: boolean                                                = false;
  recaptchaToken: string | undefined                                      = '';
  isResending: boolean                                                    = false;
  canResend: boolean                                                      = false;
  form: { email: string, password: string } = {
    email            : '',
    password          : '',
  }


  get isMobileView(): boolean
  {
    return this._appService.isMobileView;
  }
  constructor(
              private _tokenStorageService: TokenStorageService,
              private _router: Router, private _authService: AuthService,
              private _appService:AppService,
              private _translate: TranslateService,
              
              )
  {
    super();
  }


  ngOnInit()
  {


  }





  onBackButtonClick(event: boolean){
    if (!event){
      this.mode = "login"
    }
  }


  /**
   * submit the login form
   * */
  submit(isResend:boolean = false,isChecktype:boolean = true)
  {
    console.log(this.form.email,this.form.password)
    if (this.form.email && this.form.password)
    {
      if (!StringHelper.isEmail(this.form.email))
      {
        console.log(this.form.email);
        
        //this._notice.open('warning', this._translate.instant('YOUR_EMAIL_IS_NOT_VALID'))
        return
      }
      this.isCheckingLogin       = true;
      this._authService.SignIn(this.form.email ,this.form.password);
    }
    else
    {
      console.log("333333")
      
      //this._notice.open('warning', this._translate.instant('PLEASE_FILL_THE_FORM_CORRECTLY'))
    }

  }

  resend(event:any){
    this.submit(true ,event?.isCheckType );
  }




  checkFormIsValid(){
    if (this.form.password && this.form.email && StringHelper.isEmail(this.form.email)) {
      return true;
    }
      return false;

  }

  signInWithSSO(){
    this._authService.GoogleAuth()
  }


}
