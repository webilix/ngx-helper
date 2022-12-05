import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { INgxUtilsStyle } from './interfaces/ngx-style';
import { NgxUtilsService } from './ngx-utils.service';

import { NgxUtilsBottomSheetComponent } from './components/bottom-sheet/ngx-utils-bottom-sheet.component';
import { NgxUtilsBoxComponent } from './components/box/ngx-utils-box.component';
import { NgxUtilsConfirmComponent } from './components/confirm/ngx-utils-confirm.component';
import { NgxUtilsDialogComponent } from './components/dialog/ngx-utils-dialog.component';
import { NgxUtilsMenuComponent } from './components/menu/ngx-utils-menu.component';
import { NgxUtilsPaginationComponent } from './components/pagination/ngx-utils-pagination.component';

@NgModule({
    declarations: [
        NgxUtilsBottomSheetComponent,
        NgxUtilsBoxComponent,
        NgxUtilsConfirmComponent,
        NgxUtilsDialogComponent,
        NgxUtilsMenuComponent,
        NgxUtilsPaginationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot([]),

        MatBottomSheetModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
    ],
    exports: [NgxUtilsBoxComponent, NgxUtilsMenuComponent, NgxUtilsPaginationComponent],
})
export class NgxUtilsModule {
    static forRoot(style?: Partial<INgxUtilsStyle>): ModuleWithProviders<NgxUtilsModule> {
        style = style || {};
        const root: string =
            ':root{' +
            `--ngxUtilsFontSize:${style.fontSize || '12px'};` +
            `--ngxUtilsFaFont:${style.faFont || 'Yekan'};` +
            `--ngxUtilsEnFont:${style.enFont || "Roboto, 'Helvetica Neue', sans-serif"};` +
            `--ngxUtilsIconFont:${style.iconFont || 'Material Icons Outlined'};` +
            `--ngxUtilsIconSize:${style.iconSize || '16px'};` +
            `--ngxUtilsPrimaryColor:${style.primaryColor || 'rgb(29, 91, 116)'};` +
            `--ngxUtilsAccentColor:${style.accentColor || 'rgb(228, 190, 146)'};` +
            `--ngxUtilsWarnColor:${style.warnColor || 'rgb(255, 49, 27)'};` +
            `--ngxUtilsBorderColor:${style.borderColor || 'rgb(187, 206, 213)'};` +
            `--ngxUtilsBackgroundColor:${style.backgroundColor || 'rgb(212, 219, 221)'};` +
            `--ngxUtilsDialogWidth:${style.dialogWidth || '400px'};` +
            '}' +
            '.ngx-utils-icon {' +
            'font-family: var(--ngxUtilsIconFont);' +
            'font-size: var(--ngxUtilsIconSize);' +
            'width: auto !important;' +
            'height: auto !important;' +
            '}' +
            '.ngx-utils-bottom-sheet-panel .mat-bottom-sheet-container {' +
            'padding: 0 !important;' +
            'width: var(--ngxUtilsDialogWidth) !important;' +
            'max-width: 100vw !important;' +
            'min-width: auto !important;' +
            'max-height: 80vh !important;' +
            '}' +
            '.ngx-utils-color-primary {color: var(--ngxUtilsPrimaryColor) !important}' +
            '.ngx-utils-color-accent {color: var(--ngxUtilsAccentColor) !important}' +
            '.ngx-utils-color-warn {color: var(--ngxUtilsWarnColor) !important}';
        const html: HTMLStyleElement = document.createElement('style');
        html.innerHTML = root;
        document.getElementsByTagName('head')[0].appendChild(html);

        return {
            ngModule: NgxUtilsModule,
            providers: [NgxUtilsService],
        };
    }
}
