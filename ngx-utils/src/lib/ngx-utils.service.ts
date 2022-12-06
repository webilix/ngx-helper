import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { Validator } from '@webilix/validator-library';

import { INgxUtilsConfirm, NgxUtilsConfirm, NgxUtilsConfirmInfo } from './types/ngx-confirm';

import { NgxUtilsBottomSheetComponent } from './components/bottom-sheet/ngx-utils-bottom-sheet.component';
import { NgxUtilsConfirmComponent } from './components/confirm/ngx-utils-confirm.component';
import { NgxUtilsDialogComponent } from './components/dialog/ngx-utils-dialog.component';
import { NgxUtilsGalleryComponent } from './components/gallery/ngx-utils-gallery.component';
import { NgxUtilsMapComponent } from './components/map/ngx-utils-map.component';
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

    showPreview(image: string, description?: string): void {
        this.dialog.open(NgxUtilsPreviewComponent, {
            ...this._dialogFullConfig,
            data: { image, description },
        });
    }

    showGallery(images: (string | { image: string; description?: string })[], index?: number): void {
        this.dialog.open(NgxUtilsGalleryComponent, {
            ...this._dialogFullConfig,
            data: { index: index && images[index] ? index : 0, images },
        });
    }

    showMap(position: { lat: number; long: number }, zoom?: number): void;
    showMap(position: { latitude: number; longitude: number }, zoom?: number): void;
    showMap(latitude: number, longitude: number, zoom?: number): void;
    showMap(arg1: any, arg2?: any, arg3?: any): void {
        const zoom: number =
            arg3 && Validator.VALUE.isNumber(arg3)
                ? arg3
                : arg2 && Validator.VALUE.isNumber(arg2) && !Validator.VALUE.isNumber(arg1)
                ? arg2
                : 15;
        const position: { latitude: number; longitude: number } = Validator.VALUE.isNumber(arg1)
            ? { latitude: arg1, longitude: arg2 }
            : Validator.VALUE.isNumber(arg1['lat'])
            ? { latitude: arg1['lat'], longitude: arg1['long'] }
            : Validator.VALUE.isNumber(arg1['latitude'])
            ? { latitude: arg1['latitude'], longitude: arg1['longitude'] }
            : { latitude: 0, longitude: 0 };

        this.dialog.open(NgxUtilsMapComponent, {
            ...this._dialogFullConfig,
            data: { zoom, position },
        });
    }
}
