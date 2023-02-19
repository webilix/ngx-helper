import { CommonModule, DecimalPipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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

import { INgxHelperStyle } from './interfaces/ngx-helper-style';
import { NgxHelperComponent } from './ngx-helper.component';
import { NgxHelperService } from './ngx-helper.service';

import { NgxHelperBottomSheetComponent } from './components/bottom-sheet/ngx-helper-bottom-sheet.component';
import { NgxHelperBoxComponent } from './components/box/ngx-helper-box.component';
import { NgxHelperCalendarComponent } from './components/calendar/ngx-helper-calendar.component';
import { NgxHelperCalendarDateComponent } from './components/calendar/date/ngx-helper-calendar-date.component';
import { NgxHelperCalendarMonthComponent } from './components/calendar/month/ngx-helper-calendar-month.component';
import { NgxHelperCalendarWeekComponent } from './components/calendar/week/ngx-helper-calendar-week.component';
import { NgxHelperCalendarYearComponent } from './components/calendar/year/ngx-helper-calendar-year.component';
import { NgxHelperConfirmComponent } from './components/confirm/ngx-helper-confirm.component';
import { NgxHelperDialogComponent } from './components/dialog/ngx-helper-dialog.component';
import { NgxHelperDownloadComponent } from './components/download/ngx-helper-download.component';
import { NgxHelperGalleryComponent } from './components/gallery/ngx-helper-gallery.component';
import { NgxHelperListComponent } from './components/list/ngx-helper-list.component';
import { NgxHelperLoadingComponent } from './components/loading/ngx-helper-loading.component';
import { NgxHelperMapComponent } from './components/map/ngx-helper-map.component';
import { NgxHelperMenuComponent } from './components/menu/ngx-helper-menu.component';
import { NgxHelperPaginationComponent } from './components/pagination/ngx-helper-pagination.component';
import { NgxHelperParamsComponent } from './components/params/ngx-helper-params.component';
import { NgxHelperParamsPlateComponent } from './components/params/plate/ngx-helper-params-plate.component';
import { NgxHelperParamsSelectComponent } from './components/params/select/ngx-helper-params-select.component';
import { NgxHelperPlateComponent } from './components/plate/ngx-helper-plate.component';
import { NgxHelperPreviewComponent } from './components/preview/ngx-helper-preview.component';
import { NgxHelperToastComponent } from './components/toast/ngx-helper-toast.component';
import { NgxHelperUploadComponent } from './components/upload/ngx-helper-upload.component';
import { NgxHelperValuesComponent } from './components/values/ngx-helper-values.component';

import { NgxHelperPersianNumberDirective } from './directives/ngx-helper-persian-number.directive';

import { NgxHelperDateInterceptor } from './interceptors/ngx-helper-date.interceptor';
import { NgxHelperLoadingInterceptor } from './interceptors/ngx-helper-loading.interceptor';

import { NgxHelperBankCardPipe } from './pipes/ngx-helper-bank-card.pipe';
import { NgxHelperDurationPipe } from './pipes/ngx-helper-duration.pipe';
import { NgxHelperFileSizePipe } from './pipes/ngx-helper-file-size.pipe';
import { NgxHelperJalaliPipe } from './pipes/ngx-helper-jalali.pipe';
import { NgxHelperMobilePipe } from './pipes/ngx-helper-mobile.pipe';
import { NgxHelperMultiLinePipe } from './pipes/ngx-helper-multi-line.pipe';
import { NgxHelperPricePipe } from './pipes/ngx-helper-price.pipe';
import { NgxHelperSafePipe } from './pipes/ngx-helper-safe.pipe';
import { NgxHelperValuePipe } from './pipes/ngx-helper-value.pipe';
import { NgxHelperWeightPipe } from './pipes/ngx-helper-weight.pipe';

@NgModule({
    declarations: [
        NgxHelperPersianNumberDirective,

        NgxHelperComponent,

        NgxHelperBottomSheetComponent,
        NgxHelperBoxComponent,
        NgxHelperCalendarComponent,
        NgxHelperCalendarDateComponent,
        NgxHelperCalendarMonthComponent,
        NgxHelperCalendarWeekComponent,
        NgxHelperCalendarYearComponent,
        NgxHelperConfirmComponent,
        NgxHelperDialogComponent,
        NgxHelperDownloadComponent,
        NgxHelperGalleryComponent,
        NgxHelperListComponent,
        NgxHelperLoadingComponent,
        NgxHelperMapComponent,
        NgxHelperMenuComponent,
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
    ],
    exports: [
        NgxHelperComponent,

        NgxHelperBoxComponent,
        NgxHelperCalendarComponent,
        NgxHelperListComponent,
        NgxHelperLoadingComponent,
        NgxHelperMapComponent,
        NgxHelperMenuComponent,
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
        NgxHelperPricePipe,
        NgxHelperSafePipe,
        NgxHelperValuePipe,
        NgxHelperWeightPipe,
    ],
    providers: [
        DecimalPipe,
        provideEnvironmentNgxMask(),

        NgxHelperValuePipe,
        { provide: HTTP_INTERCEPTORS, useClass: NgxHelperDateInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NgxHelperLoadingInterceptor, multi: true },
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
        const root: string =
            ':root{' +
            `--ngxHelperFontSize:${style.fontSize || '12px'};` +
            `--ngxHelperFaFont:${style.faFont || 'Yekan'};` +
            `--ngxHelperEnFont:${style.enFont || "Roboto, 'Helvetica Neue', sans-serif"};` +
            `--ngxHelperIconFont:${style.iconFont || 'Material Icons Outlined'};` +
            `--ngxHelperIconSize:${style.iconSize || '16px'};` +
            `--ngxHelperPrimaryColor:${style.primaryColor || 'rgb(29, 91, 116)'};` +
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
            providers: [NgxHelperService, { provide: 'NGX_HELPER_TIMEZONE', useValue: timezone }],
        };
    }
}
