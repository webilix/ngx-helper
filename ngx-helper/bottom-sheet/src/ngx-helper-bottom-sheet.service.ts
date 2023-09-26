import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { NgxHelperBottomSheetComponent } from './ngx-helper-bottom-sheet.component';
import { INgxHelperBottomSheetConfig } from './ngx-helper-bottom-sheet.interface';

@Injectable()
export class NgxHelperBottomSheetService {
    private _bottomSheetRef?: MatBottomSheetRef<any>;
    private _bottomSheetConfig: MatBottomSheetConfig = {
        autoFocus: false,
        direction: 'rtl',
        disableClose: true,
        panelClass: 'ngx-helper-bottom-sheet-panel',
    };

    constructor(private readonly matBottomSheet: MatBottomSheet) {}

    open<R>(component: ComponentType<any>, title: string): void;
    open<R>(component: ComponentType<any>, title: string, callback: (result: R) => void): void;
    open<R>(component: ComponentType<any>, title: string, config: Partial<INgxHelperBottomSheetConfig>): void;
    open<R>(
        component: ComponentType<any>,
        title: string,
        config: Partial<INgxHelperBottomSheetConfig>,
        callback: (result: R) => void,
    ): void;
    open<R>(component: ComponentType<any>, title: string, arg1?: any, arg2?: any): void {
        const callback: (result: R) => void = arg2 || (typeof arg1 == 'function' ? arg1 : () => {});
        const config: Partial<INgxHelperBottomSheetConfig> = arg2 || (arg1 && typeof arg1 === 'object') ? arg1 : {};

        this._bottomSheetRef = this.matBottomSheet.open(NgxHelperBottomSheetComponent, {
            ...this._bottomSheetConfig,
            data: { title, component, config },
        });
        this._bottomSheetRef.afterDismissed().subscribe({ next: (result: R) => result && callback(result) });
    }

    close<R>(result?: R): void {
        if (!this._bottomSheetRef) return;

        this._bottomSheetRef.dismiss(result);
        this._bottomSheetRef = undefined;
    }
}
