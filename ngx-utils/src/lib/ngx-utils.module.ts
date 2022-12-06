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
import { NgxUtilsGalleryComponent } from './components/gallery/ngx-utils-gallery.component';
import { NgxUtilsDialogComponent } from './components/dialog/ngx-utils-dialog.component';
import { NgxUtilsLoadingComponent } from './components/loading/ngx-utils-loading.component';
import { NgxUtilsMapComponent } from './components/map/ngx-utils-map.component';
import { NgxUtilsMenuComponent } from './components/menu/ngx-utils-menu.component';
import { NgxUtilsPaginationComponent } from './components/pagination/ngx-utils-pagination.component';
import { NgxUtilsPreviewComponent } from './components/preview/ngx-utils-preview.component';

import { NgxUtilsDurationPipe } from './pipes/ngx-utils-duration.pipe';
import { NgxUtilsFileSizePipe } from './pipes/ngx-utils-file-size.pipe';
import { NgxUtilsJalaliPipe } from './pipes/ngx-utils-jalali.pipe';
import { NgxUtilsMultiLinePipe } from './pipes/ngx-utils-multi-line.pipe';
import { NgxUtilsSafePipe } from './pipes/ngx-utils-safe.pipe';

@NgModule({
    declarations: [
        NgxUtilsBottomSheetComponent,
        NgxUtilsBoxComponent,
        NgxUtilsConfirmComponent,
        NgxUtilsGalleryComponent,
        NgxUtilsDialogComponent,
        NgxUtilsLoadingComponent,
        NgxUtilsMapComponent,
        NgxUtilsMenuComponent,
        NgxUtilsPaginationComponent,
        NgxUtilsPreviewComponent,

        NgxUtilsDurationPipe,
        NgxUtilsFileSizePipe,
        NgxUtilsJalaliPipe,
        NgxUtilsMultiLinePipe,
        NgxUtilsSafePipe,
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
    exports: [
        NgxUtilsBoxComponent,
        NgxUtilsLoadingComponent,
        NgxUtilsMapComponent,
        NgxUtilsMenuComponent,
        NgxUtilsPaginationComponent,

        NgxUtilsDurationPipe,
        NgxUtilsFileSizePipe,
        NgxUtilsJalaliPipe,
        NgxUtilsMultiLinePipe,
        NgxUtilsSafePipe,
    ],
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
            `--ngxUtilsBackgroundColor:${style.backgroundColor || 'rgb(232, 239, 241)'};` +
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
            '.ngx-utils-full-dialog .mat-mdc-dialog-container .mat-mdc-dialog-surface {' +
            'background-color: rgba(0, 0, 0, 0.5) !important;' +
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
