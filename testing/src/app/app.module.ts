import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { NgxHelperModule } from '@webilix/ngx-helper';
import { NgxHelperBottomSheetModule } from '@webilix/ngx-helper/bottom-sheet';
import { NgxHelperBoxModule } from '@webilix/ngx-helper/box';
import { NgxHelperButtonGroupModule } from '@webilix/ngx-helper/button-group';
import { NgxHelperConfirmModule } from '@webilix/ngx-helper/confirm';
import { NgxHelperListModule } from '@webilix/ngx-helper/list';
import { NgxHelperLoadingModule } from '@webilix/ngx-helper/loading';
import { NgxHelperMenuModule } from '@webilix/ngx-helper/menu';
import { NgxHelperPaginationModule } from '@webilix/ngx-helper/pagination';
import { NgxHelperPlateModule } from '@webilix/ngx-helper/plate';

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
        NgxHelperBottomSheetModule,
        NgxHelperBoxModule,
        NgxHelperButtonGroupModule,
        NgxHelperConfirmModule,
        NgxHelperListModule,
        NgxHelperLoadingModule,
        NgxHelperMenuModule,
        NgxHelperPaginationModule,
        NgxHelperPlateModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
