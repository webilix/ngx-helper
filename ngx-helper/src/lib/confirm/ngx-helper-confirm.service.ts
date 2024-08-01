import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';

import { NgxHelperConfirmComponent } from './ngx-helper-confirm.component';
import { INgxHelperConfirm, INgxHelperConfirmConfig, INgxHelperConfirmResponse } from './ngx-helper-confirm.interface';
import { NgxHelperConfirm } from './ngx-helper-confirm.type';

@Injectable()
export class NgxHelperConfirmService {
    private _confirmConfig: MatBottomSheetConfig = {
        autoFocus: false,
        direction: 'rtl',
        disableClose: true,
        panelClass: 'ngx-helper-bottom-sheet-panel',
    };

    private _info: { [key in NgxHelperConfirm]: INgxHelperConfirm } = {
        ACTIVE: { title: 'فعال', icon: 'check_box', color: 'primary' },
        ARCHIVE: { title: 'آرشیو', icon: 'inventory_2', color: 'warn' },
        BLOCK: { title: 'مسدود', icon: 'disabled_by_default', color: 'warn' },
        DEACTIVE: { title: 'غیرفعال', icon: 'disabled_by_default', color: 'warn' },
        DELETE: { title: 'حذف', icon: 'delete', color: 'warn' },
    };

    constructor(private readonly matBottomSheet: MatBottomSheet) {}

    verify(confirm: NgxHelperConfirm, item: string, callback: (description?: string) => void): void;
    verify(confirm: INgxHelperConfirm, item: string, callback: (description?: string) => void): void;
    verify(
        confirm: NgxHelperConfirm,
        item: string,
        config: Partial<INgxHelperConfirmConfig>,
        callback: (description?: string) => void,
    ): void;
    verify(
        confirm: INgxHelperConfirm,
        item: string,
        config: Partial<INgxHelperConfirmConfig>,
        callback: (description?: string) => void,
    ): void;
    verify(confirm: NgxHelperConfirm | INgxHelperConfirm, item: string, arg1: any, arg2?: any): void {
        const callback: (description?: string) => void = arg2 || arg1;
        const config: Partial<INgxHelperConfirmConfig> = typeof arg2 === 'function' ? arg1 : {};

        const info: INgxHelperConfirm = typeof confirm === 'string' ? this._info[confirm] : confirm;
        this.matBottomSheet
            .open(NgxHelperConfirmComponent, { ...this._confirmConfig, data: { info, item, config: config || {} } })
            .afterDismissed()
            .subscribe((result: INgxHelperConfirmResponse) => result && result.confirmed && callback(result.value));
    }

    active(item: string, callback: (description?: string) => void): void;
    active(item: string, config: Partial<INgxHelperConfirmConfig>, callback: (description?: string) => void): void;
    active(item: string, arg1: any, arg2?: any): void {
        this.verify('ACTIVE', item, arg1, arg2);
    }

    archive(item: string, callback: (description?: string) => void): void;
    archive(item: string, config: Partial<INgxHelperConfirmConfig>, callback: (description?: string) => void): void;
    archive(item: string, arg1: any, arg2?: any): void {
        this.verify('ARCHIVE', item, arg1, arg2);
    }

    block(item: string, callback: (description?: string) => void): void;
    block(item: string, config: Partial<INgxHelperConfirmConfig>, callback: (description?: string) => void): void;
    block(item: string, arg1: any, arg2?: any): void {
        this.verify('BLOCK', item, arg1, arg2);
    }

    deactive(item: string, callback: (description?: string) => void): void;
    deactive(item: string, config: Partial<INgxHelperConfirmConfig>, callback: (description?: string) => void): void;
    deactive(item: string, arg1: any, arg2?: any): void {
        this.verify('DEACTIVE', item, arg1, arg2);
    }

    delete(item: string, callback: (description?: string) => void): void;
    delete(item: string, config: Partial<INgxHelperConfirmConfig>, callback: (description?: string) => void): void;
    delete(item: string, arg1: any, arg2?: any): void {
        this.verify('DELETE', item, arg1, arg2);
    }
}
