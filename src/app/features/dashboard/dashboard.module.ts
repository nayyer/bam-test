import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardRouting} from "src/app/features/dashboard/dashboard.routing";
import {DashboardComponent} from "src/app/features/dashboard/dashboard.component";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DashboardService} from "src/app/features/dashboard/dashboard.service";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "@shared/shared.module";
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoService } from './to-do/to-do.service';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatListModule} from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [DashboardComponent, ToDoComponent],
    imports: [
        CommonModule,
        DashboardRouting,
        FormsModule,
        MatIconModule,
        MatCheckboxModule,
        MatTooltipModule,
        TranslateModule,
        SharedModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        ReactiveFormsModule,
        DragDropModule

    ],
  providers: [
    DashboardService,
    ToDoService
  ]
})
export class DashboardModule {
}
