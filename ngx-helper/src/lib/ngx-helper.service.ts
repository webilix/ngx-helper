import { ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';

import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { Helper } from '@webilix/helper-library';

import {
    NgxHelperBottomSheetComponent,
    NgxHelperCalendarDateComponent,
    NgxHelperCalendarMonthComponent,
    NgxHelperCalendarWeekComponent,
    NgxHelperCalendarYearComponent,
    NgxHelperConfirmComponent,
    NgxHelperDialogComponent,
    NgxHelperDownloadComponent,
    NgxHelperGalleryComponent,
    NgxHelperMapComponent,
    NgxHelperPreviewComponent,
    NgxHelperToastComponent,
    NgxHelperUploadComponent,
} from './components';
import {
    INgxHelperBottomSheetConfig,
    INgxHelperCalendarConfig,
    INgxHelperCalendarPeriod,
    INgxHelperDialogConfig,
    INgxHelperToastConfig,
    INgxHelperUpload,
} from './interfaces';
import {
    INgxHelperConfirm,
    INgxHelperConfirmConfig,
    INgxHelperConfirmResponse,
    NgxHelperConfirm,
    NgxHelperConfirmInfo,
    NgxHelperToast,
} from './types';

@Injectable()
export class NgxHelperService {
    public viewContainerRef?: ViewContainerRef;

    constructor(private readonly bottomSheet: MatBottomSheet, private readonly dialog: MatDialog) {}

    private domError(): void {
        const errors: string[] = [
            'NgxHelperComponent not addedd to DOM.',
            'Please add <ngx-helper></ngx-helper> at the end of App Component HTML file / template.',
        ];
        console.error(errors.join('\n'));
    }

    //#region BOTTOM SHEET
    private _bottomSheetRef?: MatBottomSheetRef<any>;
    private _bottomSheetConfig: MatBottomSheetConfig = {
        autoFocus: false,
        direction: 'rtl',
        disableClose: true,
        panelClass: 'ngx-helper-bottom-sheet-panel',
    };

    openBottomSheet<R>(component: ComponentType<any>, title: string): void;
    openBottomSheet<R>(component: ComponentType<any>, title: string, callback: (result: R) => void): void;
    openBottomSheet<R>(
        component: ComponentType<any>,
        title: string,
        config: Partial<INgxHelperBottomSheetConfig>,
    ): void;
    openBottomSheet<R>(
        component: ComponentType<any>,
        title: string,
        config: Partial<INgxHelperBottomSheetConfig>,
        callback: (result: R) => void,
    ): void;
    openBottomSheet<R>(component: ComponentType<any>, title: string, arg1?: any, arg2?: any): void {
        const callback: (result: R) => void = arg2 || (typeof arg1 == 'function' ? arg1 : () => {});
        const config: Partial<INgxHelperBottomSheetConfig> = arg2 || (arg1 && typeof arg1 === 'object') ? arg1 : {};

        this._bottomSheetRef = this.bottomSheet.open(NgxHelperBottomSheetComponent, {
            ...this._bottomSheetConfig,
            data: { title, component, config },
        });
        this._bottomSheetRef.afterDismissed().subscribe({ next: (result: R) => result && callback(result) });
    }

    closeBottomSheet<R>(result?: R): void {
        if (!this._bottomSheetRef) return;

        this._bottomSheetRef.dismiss(result);
        this._bottomSheetRef = undefined;
    }
    //#endregion

    //#region DIALOG
    private _dialogRef?: MatDialogRef<any>;
    private _dialogConfig: MatDialogConfig = {
        autoFocus: false,
        width: 'calc(100vw - 4rem)',
        maxWidth: 'var(--ngxHelperDialogWidth)',
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
        panelClass: 'ngx-helper-full-dialog',
    };

    openDialog<R>(component: ComponentType<any>, title: string): void;
    openDialog<R>(component: ComponentType<any>, title: string, callback: (result: R) => void): void;
    openDialog<R>(component: ComponentType<any>, title: string, config: Partial<INgxHelperDialogConfig>): void;
    openDialog<R>(
        component: ComponentType<any>,
        title: string,
        config: Partial<INgxHelperDialogConfig>,
        callback: (result: R) => void,
    ): void;
    openDialog<R>(component: ComponentType<any>, title: string, arg1?: any, arg2?: any): void {
        const callback: (result: R) => void = arg2 || (typeof arg1 == 'function' ? arg1 : () => {});
        const config: Partial<INgxHelperDialogConfig> = arg2 || (arg1 && typeof arg1 === 'object') ? arg1 : {};

        this._dialogRef = this.dialog.open(NgxHelperDialogComponent, {
            ...this._dialogConfig,
            data: { title, component, config },
        });
        this._dialogRef.afterClosed().subscribe({ next: (result: R) => result && callback(result) });
    }

    closeDialog<R>(result?: R): void {
        if (!this._dialogRef) return;

        this._dialogRef.close(result);
        this._dialogRef = undefined;
    }
    //#endregion

    //#region CONFIRM
    confirm(confirm: NgxHelperConfirm, item: string, callback: (description?: string) => void): void;
    confirm(confirm: INgxHelperConfirm, item: string, callback: (description?: string) => void): void;
    confirm(
        confirm: NgxHelperConfirm,
        item: string,
        config: Partial<INgxHelperConfirmConfig>,
        callback: (description?: string) => void,
    ): void;
    confirm(
        confirm: INgxHelperConfirm,
        item: string,
        config: Partial<INgxHelperConfirmConfig>,
        callback: (description?: string) => void,
    ): void;
    confirm(confirm: NgxHelperConfirm | INgxHelperConfirm, item: string, arg1: any, arg2?: any): void {
        const callback: (description?: string) => void = arg2 || arg1;
        const config: Partial<INgxHelperConfirmConfig> = typeof arg2 === 'function' ? arg1 : {};

        const info: INgxHelperConfirm = typeof confirm === 'string' ? NgxHelperConfirmInfo[confirm] : confirm;
        this.bottomSheet
            .open(NgxHelperConfirmComponent, { ...this._bottomSheetConfig, data: { info, item, config: config || {} } })
            .afterDismissed()
            .subscribe((result: INgxHelperConfirmResponse) => result && result.confirmed && callback(result.value));
    }
    //#endregion

    //#region IMAGE
    showPreview(image: string, description?: string, html: boolean = false): void {
        this.dialog.open(NgxHelperPreviewComponent, {
            ...this._dialogFullConfig,
            data: { image, description, html },
        });
    }

    showGallery(
        images: (string | { image: string; description?: string })[],
        index?: number,
        html: boolean = false,
    ): void {
        this.dialog.open(NgxHelperGalleryComponent, {
            ...this._dialogFullConfig,
            data: { index: index && images[index] ? index : 0, images, html },
        });
    }
    //#endregion

    //#region MAP
    showMap(position: { lat: number; long: number }, zoom?: number): void;
    showMap(position: { latitude: number; longitude: number }, zoom?: number): void;
    showMap(latitude: number, longitude: number, zoom?: number): void;
    showMap(arg1: any, arg2?: any, arg3?: any): void {
        const zoom: number =
            arg3 && Helper.IS.number(arg3)
                ? arg3
                : arg2 && Helper.IS.number(arg2) && !Helper.IS.number(arg1)
                ? arg2
                : 15;
        const position: { latitude: number; longitude: number } = Helper.IS.number(arg1)
            ? { latitude: arg1, longitude: arg2 }
            : Helper.IS.number(arg1['lat'])
            ? { latitude: arg1['lat'], longitude: arg1['long'] }
            : Helper.IS.number(arg1['latitude'])
            ? { latitude: arg1['latitude'], longitude: arg1['longitude'] }
            : { latitude: 0, longitude: 0 };

        this.dialog.open(NgxHelperMapComponent, {
            ...this._dialogFullConfig,
            data: { zoom, position },
        });
    }
    //#endregion

    //#region TOAST
    private toastIndex: number = 0;
    private toasts: ComponentRef<NgxHelperToastComponent>[] = [];

    private updateToastsTop(): void {
        let top: number = 0;
        this.toasts.forEach((toast, index: number) => {
            toast.instance.top = `calc(${index / 2}rem + calc(${top}px + 1rem))`;
            top += +toast.instance.elementRef.nativeElement.offsetHeight;
        });
    }

    toast(type: NgxHelperToast, message: string | string[], timeout?: number, callback?: () => void): void;
    toast(config: INgxHelperToastConfig, message: string | string[], timeout?: number, callback?: () => void): void;
    toast(arg1: any, message: string | string[], timeout?: number, callback?: () => void): void {
        if (!this.viewContainerRef) return this.domError();

        const configs: { [key in NgxHelperToast]: INgxHelperToastConfig } = {
            ERROR: { icon: 'cancel', foreColor: '#fff', backColor: '#bd362f' },
            INFO: { icon: 'warning_amber', foreColor: '#fff', backColor: '#2f96b4' },
            SUCCESS: { icon: 'done_all', foreColor: '#fff', backColor: '#51a351' },
            WARNING: { icon: 'info', foreColor: '#fff', backColor: '#f89406' },
        };

        const toast = this.viewContainerRef.createComponent(NgxHelperToastComponent);
        toast.instance.index = ++this.toastIndex;
        toast.instance.config = typeof arg1 === 'string' ? configs[arg1 as NgxHelperToast] : arg1;
        toast.instance.message = Array.isArray(message) ? message : [message];
        toast.instance.timeout = timeout === undefined || timeout < 0 ? 5 : timeout;

        toast.instance.close = () => {
            this.toasts = this.toasts.filter((t) => t.instance.index !== toast.instance.index);
            this.updateToastsTop();
            toast.destroy();

            if (callback) callback();
        };

        this.toasts.push(toast);
        this.updateToastsTop();
    }
    //#endregion

    //#region DOWNLOAD and UPLOAD
    private componentIndex: number = 0;
    private components: (
        | ComponentRef<NgxHelperDownloadComponent>
        | ComponentRef<NgxHelperUploadComponent<any, any>>
    )[] = [];

    private updateComponentsBottom(): void {
        this.components.forEach((component, index: number) => {
            component.instance.bottom = `calc(${index / 2}rem + calc(${index * 34}px + 1rem))`;
        });
    }

    download(name: string, path: string): void {
        if (!this.viewContainerRef) return this.domError();

        const component = this.viewContainerRef.createComponent(NgxHelperDownloadComponent);
        component.instance.index = ++this.componentIndex;
        component.instance.name = name;
        component.instance.path = path;

        component.instance.close = () => {
            this.components = this.components.filter((c) => c.instance.index !== component.instance.index);
            this.updateComponentsBottom();
            component.destroy();
        };

        this.components.push(component);
        this.updateComponentsBottom();
    }

    upload<R, E>(
        file: File,
        url: string,
        onSuccess: (response: R) => void,
        onError: (error: { status: HttpStatusCode; error: E }) => void,
    ): void;
    upload<R, E>(
        file: File,
        url: string,
        config: Partial<INgxHelperUpload>,
        onSuccess: (response: R) => void,
        onError: (error: { status: HttpStatusCode; error: E }) => void,
    ): void;
    upload<R, E>(file: File, url: string, arg1: any, arg2: any, arg3?: any): void {
        const config: Partial<INgxHelperUpload> = typeof arg3 === 'function' ? arg1 : {};
        const onSuccess: (response: R) => void = typeof arg3 === 'function' ? arg2 : arg1;
        const onError: (error: { status: HttpStatusCode; error: E }) => void = typeof arg3 === 'function' ? arg3 : arg2;

        if (!this.viewContainerRef) return this.domError();

        const component = this.viewContainerRef.createComponent(NgxHelperUploadComponent<R, E>);
        component.instance.index = ++this.componentIndex;
        component.instance.file = file;
        component.instance.url = url;
        component.instance.config = {
            header: config.header || {},
            body: config.body || {},
            maxSize: config.maxSize || '0B',
            mimes: config.mimes || [],
        };

        component.instance.close = (response: R, error: { status: HttpStatusCode; error: E }) => {
            this.components = this.components.filter((c) => c.instance.index !== component.instance.index);
            this.updateComponentsBottom();
            component.destroy();

            response ? onSuccess(response) : onError(error);
        };

        this.components.push(component);
        this.updateComponentsBottom();
    }
    //#endregion

    //#region CALENDAR
    private getCalendarConfig(config?: Partial<INgxHelperCalendarConfig>): INgxHelperCalendarConfig {
        let minDate: Date | null = config?.minDate || null;
        let maxDate: Date | null = config?.maxDate || null;
        if (minDate && maxDate && minDate.getTime() >= maxDate.getTime()) {
            const temp = minDate;
            minDate = maxDate;
            maxDate = temp;
        }

        return { title: config?.title || null, value: config?.value || null, minDate, maxDate };
    }

    getDate(callback: (date: Date) => void): void;
    getDate(config: Partial<INgxHelperCalendarConfig>, callback: (date: Date) => void): void;
    getDate(arg1: any, arg2?: any): void {
        const callback: (date: Date) => void = arg2 || arg1;
        const config: Partial<INgxHelperCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.dialog
            .open(NgxHelperCalendarDateComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((date: Date) => date && callback(date));
    }

    getWeek(callback: (period: INgxHelperCalendarPeriod) => void): void;
    getWeek(config: Partial<INgxHelperCalendarConfig>, callback: (period: INgxHelperCalendarPeriod) => void): void;
    getWeek(arg1: any, arg2?: any): void {
        const callback: (period: INgxHelperCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxHelperCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.dialog
            .open(NgxHelperCalendarWeekComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((week: INgxHelperCalendarPeriod) => week && callback(week));
    }

    getMonth(callback: (period: INgxHelperCalendarPeriod) => void): void;
    getMonth(config: Partial<INgxHelperCalendarConfig>, callback: (period: INgxHelperCalendarPeriod) => void): void;
    getMonth(arg1: any, arg2?: any): void {
        const callback: (period: INgxHelperCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxHelperCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.dialog
            .open(NgxHelperCalendarMonthComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((month: INgxHelperCalendarPeriod) => month && callback(month));
    }

    getYear(callback: (period: INgxHelperCalendarPeriod) => void): void;
    getYear(config: Partial<INgxHelperCalendarConfig>, callback: (period: INgxHelperCalendarPeriod) => void): void;
    getYear(arg1: any, arg2?: any): void {
        const callback: (period: INgxHelperCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxHelperCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.dialog
            .open(NgxHelperCalendarYearComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((month: INgxHelperCalendarPeriod) => month && callback(month));
    }
    //#endregion
}
