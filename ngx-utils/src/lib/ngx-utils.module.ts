import { ModuleWithProviders, NgModule } from '@angular/core';

import { INgxStyle } from './interfaces/ngx-style';

@NgModule({})
export class NgxUtilsModule {
    static forRoot(style?: Partial<INgxStyle>): ModuleWithProviders<NgxUtilsModule> {
        style = style || {};
        const root: string =
            ':root{' +
            `--ngxUtilsFaFont:${style.faFont || 'Yekan'};` +
            `--ngxUtilsEnFont:${style.enFont || "Roboto, 'Helvetica Neue', sans-serif"};` +
            `--ngxUtilsIconFont:${style.iconFont || 'Material Icons Outlined'};` +
            `--ngxUtilsIconSize:${style.iconSize || '16px'};` +
            `--ngxUtilsPrimaryColor:${style.primaryColor || 'rgb(29, 91, 116)'};` +
            `--ngxUtilsAccentColor:${style.accentColor || 'rgb(228, 190, 146)'};` +
            `--ngxUtilsWarnColor:${style.warnColor || 'rgb(255, 49, 27)'};` +
            `--ngxUtilsBorderColor:${style.borderColor || 'rgb(187, 206, 213)'};` +
            `--ngxUtilsBackgroundColor:${style.backgroundColor || 'rgb(212, 219, 221)'};` +
            `--ngxUtilsBottomSheetWidth:${style.bottomSheetWidth || '400px'};` +
            '}';
        const html: HTMLStyleElement = document.createElement('style');
        html.innerHTML = root;
        document.getElementsByTagName('head')[0].appendChild(html);

        return { ngModule: NgxUtilsModule };
    }
}
