import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { JalaliDateTime } from '@webilix/jalali-date-time';

import { INgxUtilsStyle } from './interfaces/ngx-utils-style';
import { NgxUtilsComponent } from './ngx-utils.component';
import { NgxUtilsService } from './ngx-utils.service';

import { NgxUtilsBottomSheetComponent } from './components/bottom-sheet/ngx-utils-bottom-sheet.component';
import { NgxUtilsBoxComponent } from './components/box/ngx-utils-box.component';
import { NgxUtilsCalendarComponent } from './components/calendar/ngx-utils-calendar.component';
import { NgxUtilsCalendarDateComponent } from './components/calendar/date/ngx-utils-calendar-date.component';
import { NgxUtilsCalendarMonthComponent } from './components/calendar/month/ngx-utils-calendar-month.component';
import { NgxUtilsCalendarWeekComponent } from './components/calendar/week/ngx-utils-calendar-week.component';
import { NgxUtilsCalendarYearComponent } from './components/calendar/year/ngx-utils-calendar-year.component';
import { NgxUtilsConfirmComponent } from './components/confirm/ngx-utils-confirm.component';
import { NgxUtilsDialogComponent } from './components/dialog/ngx-utils-dialog.component';
import { NgxUtilsDownloadComponent } from './components/download/ngx-utils-download.component';
import { NgxUtilsGalleryComponent } from './components/gallery/ngx-utils-gallery.component';
import { NgxUtilsListComponent } from './components/list/ngx-utils-list.component';
import { NgxUtilsLoadingComponent } from './components/loading/ngx-utils-loading.component';
import { NgxUtilsMapComponent } from './components/map/ngx-utils-map.component';
import { NgxUtilsMenuComponent } from './components/menu/ngx-utils-menu.component';
import { NgxUtilsPaginationComponent } from './components/pagination/ngx-utils-pagination.component';
import { NgxUtilsParamsComponent } from './components/params/ngx-utils-params.component';
import { NgxUtilsParamsSelectComponent } from './components/params/select/ngx-utils-params-select.component';
import { NgxUtilsPlateComponent } from './components/plate/ngx-utils-plate.component';
import { NgxUtilsPreviewComponent } from './components/preview/ngx-utils-preview.component';
import { NgxUtilsToastComponent } from './components/toast/ngx-utils-toast.component';
import { NgxUtilsUploadComponent } from './components/upload/ngx-utils-upload.component';
import { NgxUtilsValuesComponent } from './components/values/ngx-utils-values.component';

import { NgxUtilsDateInterceptor } from './interceptors/ngx-utils-date.interceptor';
import { NgxUtilsLoadingInterceptor } from './interceptors/ngx-utils-loading.interceptor';

import { NgxUtilsBankCardPipe } from './pipes/ngx-utils-bank-card.pipe';
import { NgxUtilsDurationPipe } from './pipes/ngx-utils-duration.pipe';
import { NgxUtilsFileSizePipe } from './pipes/ngx-utils-file-size.pipe';
import { NgxUtilsJalaliPipe } from './pipes/ngx-utils-jalali.pipe';
import { NgxUtilsMobilePipe } from './pipes/ngx-utils-mobile.pipe';
import { NgxUtilsMultiLinePipe } from './pipes/ngx-utils-multi-line.pipe';
import { NgxUtilsPricePipe } from './pipes/ngx-utils-price.pipe';
import { NgxUtilsSafePipe } from './pipes/ngx-utils-safe.pipe';
import { NgxUtilsValuePipe } from './pipes/ngx-utils-value.pipe';
import { NgxUtilsWeightPipe } from './pipes/ngx-utils-weight.pipe';

@NgModule({
    declarations: [
        NgxUtilsComponent,

        NgxUtilsBottomSheetComponent,
        NgxUtilsBoxComponent,
        NgxUtilsCalendarComponent,
        NgxUtilsCalendarDateComponent,
        NgxUtilsCalendarMonthComponent,
        NgxUtilsCalendarWeekComponent,
        NgxUtilsCalendarYearComponent,
        NgxUtilsConfirmComponent,
        NgxUtilsDialogComponent,
        NgxUtilsDownloadComponent,
        NgxUtilsGalleryComponent,
        NgxUtilsListComponent,
        NgxUtilsLoadingComponent,
        NgxUtilsMapComponent,
        NgxUtilsMenuComponent,
        NgxUtilsPaginationComponent,
        NgxUtilsParamsComponent,
        NgxUtilsParamsSelectComponent,
        NgxUtilsPlateComponent,
        NgxUtilsPreviewComponent,
        NgxUtilsToastComponent,
        NgxUtilsUploadComponent,
        NgxUtilsValuesComponent,

        NgxUtilsBankCardPipe,
        NgxUtilsDurationPipe,
        NgxUtilsFileSizePipe,
        NgxUtilsJalaliPipe,
        NgxUtilsMobilePipe,
        NgxUtilsMultiLinePipe,
        NgxUtilsPricePipe,
        NgxUtilsSafePipe,
        NgxUtilsValuePipe,
        NgxUtilsWeightPipe,
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,

        ClipboardModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
    ],
    exports: [
        NgxUtilsComponent,

        NgxUtilsBoxComponent,
        NgxUtilsCalendarComponent,
        NgxUtilsListComponent,
        NgxUtilsLoadingComponent,
        NgxUtilsMapComponent,
        NgxUtilsMenuComponent,
        NgxUtilsPaginationComponent,
        NgxUtilsParamsComponent,
        NgxUtilsPlateComponent,
        NgxUtilsValuesComponent,

        NgxUtilsBankCardPipe,
        NgxUtilsDurationPipe,
        NgxUtilsFileSizePipe,
        NgxUtilsJalaliPipe,
        NgxUtilsMobilePipe,
        NgxUtilsMultiLinePipe,
        NgxUtilsPricePipe,
        NgxUtilsSafePipe,
        NgxUtilsValuePipe,
        NgxUtilsWeightPipe,
    ],
    providers: [
        NgxUtilsValuePipe,
        { provide: HTTP_INTERCEPTORS, useClass: NgxUtilsDateInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NgxUtilsLoadingInterceptor, multi: true },
    ],
})
export class NgxUtilsModule {
    static forRoot(): ModuleWithProviders<NgxUtilsModule>;
    static forRoot(timezone: string): ModuleWithProviders<NgxUtilsModule>;
    static forRoot(style: Partial<INgxUtilsStyle>): ModuleWithProviders<NgxUtilsModule>;
    static forRoot(timezone: string, style: Partial<INgxUtilsStyle>): ModuleWithProviders<NgxUtilsModule>;
    static forRoot(arg1?: any, arg2?: any): ModuleWithProviders<NgxUtilsModule> {
        const style: Partial<INgxUtilsStyle> =
            arg1 && typeof arg1 !== 'string' ? arg1 : arg2 && typeof arg2 !== 'string' ? arg2 : {};
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
            '.ngx-utils-en {' +
            'font-family: var(--ngxUtilsEnFont);' +
            'direction: ltr;' +
            'text-align: left;' +
            '}' +
            '.ngx-utils-color-primary {color: var(--ngxUtilsPrimaryColor) !important}' +
            '.ngx-utils-color-accent {color: var(--ngxUtilsAccentColor) !important}' +
            '.ngx-utils-color-warn {color: var(--ngxUtilsWarnColor) !important}';
        const html: HTMLStyleElement = document.createElement('style');
        html.innerHTML = root;
        document.getElementsByTagName('head')[0].appendChild(html);

        let timezone: string = typeof arg1 === 'string' ? arg1 : 'Asia/Tehran';
        if (!JalaliDateTime().timezones().includes(timezone)) timezone = 'Asia/Tehran';

        return {
            ngModule: NgxUtilsModule,
            providers: [NgxUtilsService, { provide: 'NGX_UTILS_TIMEZONE', useValue: timezone }],
        };
    }
}
