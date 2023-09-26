import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { NgxHelperDialogComponent } from './ngx-helper-dialog.component';
import { INgxHelperDialogConfig } from './ngx-helper-dialog.interface';

@Injectable()
export class NgxHelperDialogService {
    private _dialogRef?: MatDialogRef<any>;
    private _dialogConfig: MatDialogConfig = {
        autoFocus: false,
        width: 'calc(100vw - 4rem)',
        maxWidth: 'var(--ngxHelperDialogWidth)',
        maxHeight: '80vh',
        direction: 'rtl',
        disableClose: true,
    };

    constructor(private readonly matDialog: MatDialog) {}

    open<R>(component: ComponentType<any>, title: string): void;
    open<R>(component: ComponentType<any>, title: string, callback: (result: R) => void): void;
    open<R>(component: ComponentType<any>, title: string, config: Partial<INgxHelperDialogConfig>): void;
    open<R>(
        component: ComponentType<any>,
        title: string,
        config: Partial<INgxHelperDialogConfig>,
        callback: (result: R) => void,
    ): void;
    open<R>(component: ComponentType<any>, title: string, arg1?: any, arg2?: any): void {
        const callback: (result: R) => void = arg2 || (typeof arg1 == 'function' ? arg1 : () => {});
        const config: Partial<INgxHelperDialogConfig> = arg2 || (arg1 && typeof arg1 === 'object') ? arg1 : {};

        this._dialogRef = this.matDialog.open(NgxHelperDialogComponent, {
            ...this._dialogConfig,
            data: { title, component, config },
        });
        this._dialogRef.afterClosed().subscribe({ next: (result: R) => result && callback(result) });
    }

    close<R>(result?: R): void {
        if (!this._dialogRef) return;

        this._dialogRef.close(result);
        this._dialogRef = undefined;
    }
}
