import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { JalaliDateTime } from '@webilix/jalali-date-time';

import { NgxHelperDateInterceptor, NgxHelperLoadingInterceptor } from './interceptors';

import { NgxHelperComponent } from './ngx-helper.component';
import { INgxHelperConfig, INgxHelperStyle } from './ngx-helper.interface';
import { NGX_HELPER_LOADING_HEADER } from './ngx-helper.values';

@NgModule({
    declarations: [NgxHelperComponent],
    imports: [CommonModule, HttpClientModule],
    exports: [NgxHelperComponent],
    providers: [provideHttpClient(withInterceptors([NgxHelperLoadingInterceptor, NgxHelperDateInterceptor]))],
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
