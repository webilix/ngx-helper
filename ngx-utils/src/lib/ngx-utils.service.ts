import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { INgxUtilsConfirm, NgxUtilsConfirm, NgxUtilsConfirmInfo } from './types/ngx-confirm';

import { NgxUtilsBottomSheetComponent } from './components/bottom-sheet/ngx-utils-bottom-sheet.component';
import { NgxUtilsConfirmComponent } from './components/confirm/ngx-utils-confirm.component';
import { NgxUtilsDialogComponent } from './components/dialog/ngx-utils-dialog.component';
import { NgxUtilsPreviewComponent } from './components/preview/ngx-utils-preview.component';

@Injectable()
export class NgxUtilsService {
    constructor(private readonly bottomSheet: MatBottomSheet, private readonly dialog: MatDialog) {}

    private _bottomSheetRef?: MatBottomSheetRef<any>;
    private _bottomSheetConfig: MatBottomSheetConfig = {
        autoFocus: false,
        direction: 'rtl',
        disableClose: true,
        panelClass: 'ngx-utils-bottom-sheet-panel',
    };

    private _dialogRef?: MatDialogRef<any>;
    private _dialogConfig: MatDialogConfig = {
        autoFocus: false,
        width: 'calc(100vw - 4rem)',
        maxWidth: 'var(--ngxUtilsDialogWidth)',
        maxHeight: '80vh',
        direction: 'rtl',
        disableClose: true,
    };
    private _dialogFullConfig: MatDialogConfig = {
        autoFocus: false,
        width: '100vw',
        maxWidth: 'none',
        height: '100vh',
        maxHeight: 'none',
        direction: 'rtl',
        hasBackdrop: false,
        panelClass: 'ngx-utils-full-dialog',
    };

    openBottomSheet<R>(component: ComponentType<any>, title: string, data?: any): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this._bottomSheetRef = this.bottomSheet.open(NgxUtilsBottomSheetComponent, {
                ...this._bottomSheetConfig,
                data: { component, title, data },
            });

            this._bottomSheetRef
                .afterDismissed()
                .subscribe({ next: (result?: R) => (result ? resolve(result) : reject()) });
        });
    }

    closeBottomSheet<R>(result?: R): void {
        if (!this._bottomSheetRef) return;

        this._bottomSheetRef.dismiss(result);
        this._bottomSheetRef = undefined;
    }

    confirm(confirm: NgxUtilsConfirm, item: string, title?: string, message?: string): Promise<void>;
    confirm(confirm: INgxUtilsConfirm, item: string, title?: string, message?: string): Promise<void>;
    confirm(
        confirm: NgxUtilsConfirm | INgxUtilsConfirm,
        item: string,
        title?: string,
        message?: string,
    ): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const info: INgxUtilsConfirm = typeof confirm === 'string' ? NgxUtilsConfirmInfo[confirm] : confirm;
            this.bottomSheet
                .open(NgxUtilsConfirmComponent, {
                    ...this._bottomSheetConfig,
                    data: { info, item, title, message },
                })
                .afterDismissed()
                .subscribe((result: boolean) => (result ? resolve() : reject()));
        });
    }

    openDialog<R>(component: ComponentType<any>, title: string, data?: any): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this._dialogRef = this.dialog.open(NgxUtilsDialogComponent, {
                ...this._dialogConfig,
                data: { component, title, data },
            });

            this._dialogRef.afterClosed().subscribe({ next: (result: R) => (result ? resolve(result) : reject()) });
        });
    }

    closeDialog<R>(result?: R): void {
        if (!this._dialogRef) return;

        this._dialogRef.close(result);
        this._dialogRef = undefined;
    }

    preview(image: string, description?: string): void {
        this.dialog.open(NgxUtilsPreviewComponent, {
            ...this._dialogFullConfig,
            data: { image, description },
        });
    }
}
