import {Component} from "@angular/core";

import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "src/app/auth/auth.service";
import {AppService} from "@core/root/app.service";
import { takeUntil } from 'rxjs';
import { BaseComponent } from '@core/root/base.component';
import {StringHelper} from "@core/helpers/StringHelper";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component(
  {
    selector: 'app-sign-up',
    templateUrl: 'sign-up.html',
    styleUrls: ['sign-up.scss']
  }
)
export class SignUpComponent extends BaseComponent {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  activeStepIndex: number = 1;
  referral_code: string ='';
  nationalCodeRegex: RegExp = StringHelper.nationalCodeRegex();
  mobileRegex: RegExp       = StringHelper.mobileRegex();
  referralCodeRegex: RegExp = StringHelper.exact6CharsRegex();
  userProfile:FormGroup =  this.fb.group({
    firstname :['',Validators.required],
    lastname: ['',Validators.required],
    email:['',[Validators.required, Validators.pattern(this.emailPattern)]],
    password:['',Validators.required]
 })

  agreement: boolean        = false;
  isChecking: boolean       = false;
  get isMobileView(): boolean
  {
    return this._appService.isMobileView;
  }

  get form1 () {
    return this.userProfile.controls
  }

  constructor(private _router: Router,
              private _translate: TranslateService,
              private _appService: AppService,
              private _authService: AuthService,
              private  _activatedRoute: ActivatedRoute,
              private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.queryParams.pipe(takeUntil(this.stop$)).subscribe((queryParams: any) => {
      if (queryParams.referral) {
        this.referral_code = queryParams.referral;
      }
    })
  }




  backButtonClick(event: boolean) {
    if (!event) {
      this.activeStepIndex = 1
    }
  }


  // /**
  //  * triggers for change to next step
  //  * */
  // next(data: any, stepIndex: number) {
  //   if (stepIndex == 4) {
  //     this._appService.getUserInfo();
  //     if(this.isMobileView){
  //       this._router.navigate(['/'])
  //     }
  //     else{
  //       this._router.navigate(['/exchange'])
  //     }
  //   } else {
  //     this.activeStepIndex = stepIndex + 1;
  //   }

  //}

  /**
   * triggers when this component has destroyed
   * */


/**
   * prevent from entering non-numeric characters
   **/
  onKeyUp(event: any)
  {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode >= 44 && charCode <= 57 || charCode >= 1776 && charCode <= 1785 || charCode === 110 || charCode === 189 || charCode === 109)
    {
      return true;
    }
    else
    {
      event.preventDefault();
      return false;
    }

  }


  /**
   * change persian num to english
   * @param str - string
   **/
  changeNumToEng(str: string)
  {
    // for (let i = 0; i < 10; i++)
    // {
    //   str = str.replace(this.persianNumbers[i], i.toString()).replace(this.englishNumbers[i], i.toString())
    // }
    // return str;
  };


  /**
   * submit the form
   * */
  submit()
  {
    //this.onFinish.emit(this.form);
    // if (this.isFormValid())
    // {
    //   // if (!this.agreement)
    //   // {
    //   //   this._notice.open('warning', this._translate.instant('PLEASE_AGREE_THE_CONDITIONS'))
    //   //   return;
    //   // }

    // }
    // else
    // {
    //   //this._notice.open('warning', this._translate.instant('PLEASE_FILL_THE_FORM_CORRECTLY'))
    // }

  }

  // /**
  //  * check the form validation
  //  * @returns {boolean} form validity
  //  * */
  // isFormValid(): boolean
  // {
  //   this.form.mobile      = this.changeNumToEng(this.form.mobile);
  //   //this.form.national_id = this.changeNumToEng(this.form.national_id);
  //   if (!this.form.mobile )
  //   {
  //     return false;
  //   }

  //   // if (!StringHelper.isNationalCode(this.form.national_id))
  //   // {
  //   //   return false;
  //   // }
  //   if (!StringHelper.isMobile(this.form.mobile))
  //   {
  //     return false;
  //   }
  //   //if (!StringHelper.exact6CharsRegex().test(this.form.referral_code))
  //   //{
  //   //  return false;
  //   //}

  //   return true;
  // }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userProfile.value,this.userProfile.get('email')?.value);
    
    this._authService.SignUp(this.userProfile.value).then(()=>{
      this._router.navigate(['/']);
    }

    ).catch(err=>{
      console.log(err);
    })

  }

  // ngOnDestroy() {
  //   super.ngOnDestroy();
  //   this._authService.resetData();
  // }
  signInWithSSO(){
    this._authService.GoogleAuth()
  }
}
