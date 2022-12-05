import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

import { NgxUtilsModule, NgxUtilsViewModule } from '@ngx-utils';

import { AppComponent } from './app.component';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    declarations: [AppComponent, BottomSheetComponent, DialogComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,

        MatButtonModule,

        NgxUtilsModule.forRoot(),
        NgxUtilsViewModule,
    ],
    providers: [],

    bootstrap: [AppComponent],
})
export class AppModule {}
