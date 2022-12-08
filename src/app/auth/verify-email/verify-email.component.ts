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
    selector: 'app-verify-email',
    templateUrl: 'verify-email.html',
    styleUrls: ['verify-email.scss']
  }
)
export class VerifyEmailComponent extends BaseComponent {
 

  constructor(private _router: Router,
              private _translate: TranslateService,
              private _appService: AppService,
              public _authService: AuthService,
              private  _activatedRoute: ActivatedRoute,
              private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    
  }




}
