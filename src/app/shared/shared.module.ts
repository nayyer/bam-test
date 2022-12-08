import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatSidenavModule} from "@angular/material/sidenav";


import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

import {MatRadioModule} from "@angular/material/radio";

import {RouterModule} from "@angular/router";

import {MatProgressBarModule} from "@angular/material/progress-bar";

import {FooterComponent} from "@shared/layouts/footer/footer.component";
import {HeaderComponent} from "@shared/layouts/header/header.component";
import {SearchPipe} from "@shared/pipes/SearchPipe";


@NgModule({
            declarations: [
         
              FooterComponent,
              HeaderComponent,
              SearchPipe


            ],
            imports     : [
              CommonModule,
              TranslateModule,
              MatSidenavModule,
              MatSliderModule,
              MatSlideToggleModule,
              MatToolbarModule,
              MatCheckboxModule,
              MatIconModule,
              MatButtonModule,
              MatTooltipModule,
              MatMenuModule,
              MatBadgeModule,
              MatListModule,

              FormsModule,
              MatDialogModule,
              MatFormFieldModule,
              MatInputModule,
              MatSelectModule,

              MatRadioModule,

              RouterModule,

              MatProgressBarModule,


            ],
            exports     : [
              CommonModule,
              TranslateModule,
              MatSidenavModule,
              MatSliderModule,
              MatSlideToggleModule,
              MatToolbarModule,
              MatCheckboxModule,
              MatIconModule,
              MatButtonModule,
              MatTooltipModule,
              MatMenuModule,
              MatBadgeModule,
              MatListModule,

              MatDialogModule,
              MatFormFieldModule,
              MatInputModule,
              MatSelectModule,

              MatRadioModule,

              FooterComponent,
              HeaderComponent,
              SearchPipe,

              //SocialLoginModule
            ],
            providers   : [

            ]
          })
export class SharedModule {}
