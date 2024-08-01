import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { NgxHelperModule } from '@webilix/ngx-helper';
import { NgxHelperBoxModule } from '@webilix/ngx-helper/box';
import { NgxHelperButtonGroupModule } from '@webilix/ngx-helper/button-group';
import { NgxHelperCalendarModule } from '@webilix/ngx-helper/calendar';
import { NgxHelperHttpModule } from '@webilix/ngx-helper/http';
import { NgxHelperListModule } from '@webilix/ngx-helper/list';
import { NgxHelperLoaderModule } from '@webilix/ngx-helper/loader';
import { NgxHelperMenuModule } from '@webilix/ngx-helper/menu';
import { NgxHelperPaginationModule } from '@webilix/ngx-helper/pagination';
import { NgxHelperParamModule } from '@webilix/ngx-helper/param';
import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';
import { NgxHelperPlateModule } from '@webilix/ngx-helper/plate';
import { NgxHelperProgressModule } from '@webilix/ngx-helper/progress';
import { NgxHelperTagModule } from '@webilix/ngx-helper/tag';
import { NgxHelperValueModule } from '@webilix/ngx-helper/value';

import { AppComponent } from './app.component';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { BoxComponent } from './box/box.component';
import { DialogComponent } from './dialog/dialog.component';
import { ListComponent } from './list/list.component';
import { PipeComponent } from './pipe/pipe.component';
import { ValuesComponent } from './values/values.component';

@NgModule({
    declarations: [
        AppComponent,
        BottomSheetComponent,
        BoxComponent,
        DialogComponent,
        ListComponent,
        PipeComponent,
        ValuesComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([{ path: '**', component: AppComponent }]),

        MatButtonModule,

        NgxHelperModule.forRoot(),
        NgxHelperBoxModule,
        NgxHelperButtonGroupModule,
        NgxHelperCalendarModule,
        NgxHelperHttpModule,
        NgxHelperListModule,
        NgxHelperLoaderModule,
        NgxHelperMenuModule,
        NgxHelperPaginationModule,
        NgxHelperParamModule,
        NgxHelperPipeModule,
        NgxHelperPlateModule,
        NgxHelperProgressModule,
        NgxHelperTagModule,
        NgxHelperValueModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
