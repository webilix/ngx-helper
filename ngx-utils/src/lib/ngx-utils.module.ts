import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { INgxStyle } from './interfaces/ngx-style';
import { NgxUtilsService } from './ngx-utils.service';

import { NgxBottomSheetComponent } from './components/ngx-bottom-sheet/ngx-bottom-sheet.component';
import { NgxDialogComponent } from './components/ngx-dialog/ngx-dialog.component';

@NgModule({
    declarations: [NgxBottomSheetComponent, NgxDialogComponent],
    imports: [CommonModule, MatBottomSheetModule, MatDialogModule, MatIconModule],
})
export class NgxUtilsModule {
    static forRoot(style?: Partial<INgxStyle>): ModuleWithProviders<NgxUtilsModule> {
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
            '}';
        const html: HTMLStyleElement = document.createElement('style');
        html.innerHTML = root;
        document.getElementsByTagName('head')[0].appendChild(html);

        return {
            ngModule: NgxUtilsModule,
            providers: [NgxUtilsService],
        };
    }
}
