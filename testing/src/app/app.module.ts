import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { NgxUtilsModule } from '@ngx-utils';

import { AppComponent } from './app.component';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { BoxComponent } from './box/box.component';
import { DialogComponent } from './dialog/dialog.component';
import { ListComponent } from './list/list.component';
import { PipeComponent } from './pipe/pipe.component';

@NgModule({
    declarations: [AppComponent, BottomSheetComponent, BoxComponent, DialogComponent, ListComponent, PipeComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([{ path: '**', component: AppComponent }]),

        MatButtonModule,

        NgxUtilsModule.forRoot(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
