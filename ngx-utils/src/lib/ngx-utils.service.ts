import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { NgxBottomSheetComponent } from './components/ngx-bottom-sheet/ngx-bottom-sheet.component';
import { NgxDialogComponent } from './components/ngx-dialog/ngx-dialog.component';

@Injectable()
export class NgxUtilsService {
    constructor(private readonly bottomSheet: MatBottomSheet, private readonly dialog: MatDialog) {}

    //#region BottomSheet
    private _bottomSheetRef?: MatBottomSheetRef<any>;

    openBottomSheet<R>(component: ComponentType<any>, title: string, data?: any): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this._bottomSheetRef = this.bottomSheet.open<
                NgxBottomSheetComponent,
                { component: ComponentType<any>; title: string; data?: any },
                R
            >(NgxBottomSheetComponent, {
                autoFocus: false,
                direction: 'rtl',
                disableClose: true,
                panelClass: 'ngx-utils-bottom-sheet-panel',
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
    //#region

    //#region Dialog
    private _dialogRef?: MatDialogRef<any>;

    openDialog<R>(component: ComponentType<any>, title: string, data?: any): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this._dialogRef = this.dialog.open<
                NgxDialogComponent,
                { component: ComponentType<any>; title: string; data?: any },
                R
            >(NgxDialogComponent, {
                autoFocus: false,
                width: 'calc(100vw - 4rem)',
                maxWidth: 'var(--ngxUtilsDialogWidth)',
                maxHeight: '80vh',
                direction: 'rtl',
                disableClose: true,
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
    //#endregion
}
