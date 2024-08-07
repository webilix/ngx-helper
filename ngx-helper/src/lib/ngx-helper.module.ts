import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { JalaliDateTime } from '@webilix/jalali-date-time';
import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';
import { NgxHelperLoaderModule } from '@webilix/ngx-helper/loader';

import {
    NgxHelperBottomSheetComponent,
    NgxHelperConfirmComponent,
    NgxHelperCoordinatesGetComponent,
    NgxHelperCoordinatesShowComponent,
    NgxHelperDialogComponent,
    NgxHelperHttpDownloadComponent,
    NgxHelperHttpUploadComponent,
    NgxHelperImagePreviewComponent,
    NgxHelperImageGalleryComponent,
    NgxHelperToastComponent,
} from './components';

import { NgxHelperBottomSheetService } from './components/bottom-sheet';
import { NgxHelperConfirmService } from './components/confirm';
import { NgxHelperCoordinatesService } from './components/coordinates/ngx-helper-coordinates.service';
import { NgxHelperDialogService } from './components/dialog/ngx-helper-dialog.service';
import { NgxHelperHttpService } from './components/http/ngx-helper-http.service';
import { NgxHelperImageService } from './components/image/ngx-helper-image.service';
import { NgxHelperToastService } from './components/toast/ngx-helper-toast.service';

import { NgxHelperDateInterceptor, NgxHelperLoadingInterceptor } from './interceptors';

import { NgxHelperComponent } from './ngx-helper.component';
import { INgxHelperConfig, INgxHelperStyle } from './ngx-helper.interface';
import { NGX_HELPER_LOADING_HEADER } from './ngx-helper.values';

@NgModule({
    declarations: [
        NgxHelperComponent,

        NgxHelperBottomSheetComponent,

        NgxHelperConfirmComponent,

        NgxHelperCoordinatesGetComponent,
        NgxHelperCoordinatesShowComponent,

        NgxHelperDialogComponent,

        NgxHelperHttpDownloadComponent,
        NgxHelperHttpUploadComponent,

        NgxHelperImagePreviewComponent,
        NgxHelperImageGalleryComponent,

        NgxHelperToastComponent,
    ],
    exports: [NgxHelperComponent],
    imports: [
        CommonModule,
        NgxMaskDirective,

        MatBottomSheetModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatProgressBarModule,

        NgxHelperPipeModule,
        NgxHelperLoaderModule,
    ],
    providers: [
        provideHttpClient(withInterceptors([NgxHelperLoadingInterceptor, NgxHelperDateInterceptor])),
        provideHttpClient(withInterceptorsFromDi()),
        provideNgxMask(),

        NgxHelperBottomSheetService,
        NgxHelperConfirmService,
        NgxHelperCoordinatesService,
        NgxHelperDialogService,
        NgxHelperHttpService,
        NgxHelperImageService,
        NgxHelperToastService,
    ],
})
export class NgxHelperModule {
    static forRoot(config?: INgxHelperConfig): ModuleWithProviders<NgxHelperModule> {
        const style: Partial<INgxHelperStyle> = config?.style || {};
        const primaryColor: string = style.primaryColor || 'rgb(29, 91, 116)';

        const root: string =
            ':root{' +
            `--ngxHelperFontSize:${style.fontSize || '12px'};` +
            `--ngxHelperFaFont:${style.faFont || 'Yekan'};` +
            `--ngxHelperEnFont:${style.enFont || "Roboto, 'Helvetica Neue', sans-serif"};` +
            `--ngxHelperIconFont:${style.iconFont || 'Material Icons Outlined'};` +
            `--ngxHelperIconSize:${style.iconSize || '16px'};` +
            `--ngxHelperPrimaryColor:${primaryColor};` +
            `--ngxHelperAccentColor:${style.accentColor || 'rgb(228, 190, 146)'};` +
            `--ngxHelperWarnColor:${style.warnColor || 'rgb(255, 49, 27)'};` +
            `--ngxHelperBorderColor:${style.borderColor || 'rgb(187, 206, 213)'};` +
            `--ngxHelperBackgroundColor:${style.backgroundColor || 'rgb(232, 239, 241)'};` +
            `--ngxHelperDialogWidth:${style.dialogWidth || '400px'};` +
            '}' +
            '.ngx-helper-icon {' +
            'font-family: var(--ngxHelperIconFont);' +
            'font-size: var(--ngxHelperIconSize);' +
            'width: auto !important;' +
            'height: auto !important;' +
            '}' +
            '.ngx-helper-bottom-sheet-panel .mat-bottom-sheet-container {' +
            'padding: 0 !important;' +
            'width: var(--ngxHelperDialogWidth) !important;' +
            'max-width: 100vw !important;' +
            'min-width: auto !important;' +
            'max-height: 80vh !important;' +
            '}' +
            '.ngx-helper-full-dialog .mat-mdc-dialog-container .mat-mdc-dialog-surface {' +
            'background-color: rgba(0, 0, 0, 0.5) !important;' +
            '}' +
            '.ngx-helper-en {' +
            'font-family: var(--ngxHelperEnFont);' +
            'direction: ltr;' +
            'text-align: left;' +
            '}' +
            '.ngx-helper-color-primary {color: var(--ngxHelperPrimaryColor) !important}' +
            '.ngx-helper-color-accent {color: var(--ngxHelperAccentColor) !important}' +
            '.ngx-helper-color-warn {color: var(--ngxHelperWarnColor) !important}' +
            '.ngx-helper-hidden {display: none !important}';
        const html: HTMLStyleElement = document.createElement('style');
        html.innerHTML = root;
        document.getElementsByTagName('head')[0].appendChild(html);

        const timezone: string =
            config?.timezone && JalaliDateTime().timezones().includes(config.timezone)
                ? config.timezone
                : 'Asia/Tehran';
        const toastXPosition: 'LEFT' | 'CENTER' | 'RIGHT' = config?.toastXPosition || 'CENTER';

        return {
            ngModule: NgxHelperModule,
            providers: [
                { provide: 'NGX_HELPER_LOADING_HEADER', useValue: NGX_HELPER_LOADING_HEADER },
                { provide: 'NGX_HELPER_PRIMARY_COLOR', useValue: primaryColor },
                { provide: 'NGX_HELPER_TIMEZONE', useValue: timezone },
                { provide: 'NGX_HELPER_TOAST_XPOSITION', useValue: toastXPosition },
            ],
        };
    }
}
