import { CommonModule, DecimalPipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

import { JalaliDateTime } from '@webilix/jalali-date-time';

import { NgxHelperMenuModule } from '@webilix/ngx-helper/menu';

import { INgxHelperStyle } from './interfaces';

import {
    NgxHelperBottomSheetComponent,
    NgxHelperButtonGroupComponent,
    NgxHelperCalendarComponent,
    NgxHelperCalendarDateComponent,
    NgxHelperCalendarMonthComponent,
    NgxHelperCalendarWeekComponent,
    NgxHelperCalendarYearComponent,
    NgxHelperConfirmComponent,
    NgxHelperCoordinatesGetComponent,
    NgxHelperCoordinatesShowComponent,
    NgxHelperDialogComponent,
    NgxHelperDownloadComponent,
    NgxHelperGalleryComponent,
    NgxHelperListComponent,
    NgxHelperLoadingComponent,
    NgxHelperPaginationComponent,
    NgxHelperParamsComponent,
    NgxHelperParamsPlateComponent,
    NgxHelperParamsSelectComponent,
    NgxHelperPlateComponent,
    NgxHelperPreviewComponent,
    NgxHelperToastComponent,
    NgxHelperUploadComponent,
    NgxHelperValuesComponent,
} from './components';

import { NgxHelperPersianNumberDirective } from './directives';

import { NgxHelperDateInterceptor, NgxHelperLoadingInterceptor } from './interceptors';

import {
    NgxHelperBankCardPipe,
    NgxHelperDurationPipe,
    NgxHelperFileSizePipe,
    NgxHelperJalaliPipe,
    NgxHelperMobilePipe,
    NgxHelperMultiLinePipe,
    NgxHelperPeriodPipe,
    NgxHelperPricePipe,
    NgxHelperSafePipe,
    NgxHelperValuePipe,
    NgxHelperWeightPipe,
} from './pipes';

import { NgxHelperComponent } from './ngx-helper.component';
import { NgxHelperService } from './ngx-helper.service';

@NgModule({
    declarations: [
        NgxHelperPersianNumberDirective,

        NgxHelperComponent,

        NgxHelperBottomSheetComponent,
        NgxHelperButtonGroupComponent,
        NgxHelperCalendarComponent,
        NgxHelperCalendarDateComponent,
        NgxHelperCalendarMonthComponent,
        NgxHelperCalendarWeekComponent,
        NgxHelperCalendarYearComponent,
        NgxHelperConfirmComponent,
        NgxHelperCoordinatesGetComponent,
        NgxHelperCoordinatesShowComponent,
        NgxHelperDialogComponent,
        NgxHelperDownloadComponent,
        NgxHelperGalleryComponent,
        NgxHelperListComponent,
        NgxHelperLoadingComponent,
        NgxHelperPaginationComponent,
        NgxHelperParamsComponent,
        NgxHelperParamsPlateComponent,
        NgxHelperParamsSelectComponent,
        NgxHelperPlateComponent,
        NgxHelperPreviewComponent,
        NgxHelperToastComponent,
        NgxHelperUploadComponent,
        NgxHelperValuesComponent,

        NgxHelperBankCardPipe,
        NgxHelperDurationPipe,
        NgxHelperFileSizePipe,
        NgxHelperJalaliPipe,
        NgxHelperMobilePipe,
        NgxHelperMultiLinePipe,
        NgxHelperPeriodPipe,
        NgxHelperPricePipe,
        NgxHelperSafePipe,
        NgxHelperValuePipe,
        NgxHelperWeightPipe,
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        NgxMaskDirective,

        ClipboardModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSelectModule,

        NgxHelperMenuModule,
    ],
    exports: [
        NgxHelperComponent,

        NgxHelperButtonGroupComponent,
        NgxHelperCalendarComponent,
        NgxHelperListComponent,
        NgxHelperLoadingComponent,
        NgxHelperPaginationComponent,
        NgxHelperParamsComponent,
        NgxHelperPlateComponent,
        NgxHelperValuesComponent,

        NgxHelperBankCardPipe,
        NgxHelperDurationPipe,
        NgxHelperFileSizePipe,
        NgxHelperJalaliPipe,
        NgxHelperMobilePipe,
        NgxHelperMultiLinePipe,
        NgxHelperPeriodPipe,
        NgxHelperPricePipe,
        NgxHelperSafePipe,
        NgxHelperValuePipe,
        NgxHelperWeightPipe,
    ],
    providers: [
        DecimalPipe,
        provideEnvironmentNgxMask(),

        NgxHelperValuePipe,
        provideHttpClient(withInterceptors([NgxHelperLoadingInterceptor, NgxHelperDateInterceptor])),
    ],
})
export class NgxHelperModule {
    static forRoot(): ModuleWithProviders<NgxHelperModule>;
    static forRoot(timezone: string): ModuleWithProviders<NgxHelperModule>;
    static forRoot(style: Partial<INgxHelperStyle>): ModuleWithProviders<NgxHelperModule>;
    static forRoot(timezone: string, style: Partial<INgxHelperStyle>): ModuleWithProviders<NgxHelperModule>;
    static forRoot(arg1?: any, arg2?: any): ModuleWithProviders<NgxHelperModule> {
        const style: Partial<INgxHelperStyle> =
            arg1 && typeof arg1 !== 'string' ? arg1 : arg2 && typeof arg2 !== 'string' ? arg2 : {};
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
            '.ngx-helper-color-warn {color: var(--ngxHelperWarnColor) !important}';
        const html: HTMLStyleElement = document.createElement('style');
        html.innerHTML = root;
        document.getElementsByTagName('head')[0].appendChild(html);

        let timezone: string = typeof arg1 === 'string' ? arg1 : 'Asia/Tehran';
        if (!JalaliDateTime().timezones().includes(timezone)) timezone = 'Asia/Tehran';

        return {
            ngModule: NgxHelperModule,
            providers: [
                NgxHelperService,
                { provide: 'NGX_HELPER_TIMEZONE', useValue: timezone },
                { provide: 'NGX_HELPER_PRIMARY_COLOR', useValue: primaryColor },
            ],
        };
    }
}
