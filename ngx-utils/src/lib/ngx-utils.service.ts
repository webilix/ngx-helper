import { ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';

import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { Helper } from '@webilix/helper-library';

import { INgxUtilsBottomSheetConfig } from './interfaces/ngx-utils-bottomsheet';
import { INgxUtilsCalendarConfig, INgxUtilsCalendarPeriod } from './interfaces/ngx-utils-calendar';
import { INgxUtilsDialogConfig } from './interfaces/ngx-utils-dialog';
import { INgxUtilsUpload } from './interfaces/ngx-utils-upload';
import {
    INgxUtilsConfirm,
    INgxUtilsConfirmConfig,
    INgxUtilsConfirmResponse,
    NgxUtilsConfirm,
    NgxUtilsConfirmInfo,
} from './types/ngx-utils-confirm';

import { NgxUtilsBottomSheetComponent } from './components/bottom-sheet/ngx-utils-bottom-sheet.component';
import { NgxUtilsCalendarDateComponent } from './components/calendar/date/ngx-utils-calendar-date.component';
import { NgxUtilsCalendarMonthComponent } from './components/calendar/month/ngx-utils-calendar-month.component';
import { NgxUtilsCalendarWeekComponent } from './components/calendar/week/ngx-utils-calendar-week.component';
import { NgxUtilsCalendarYearComponent } from './components/calendar/year/ngx-utils-calendar-year.component';
import { NgxUtilsConfirmComponent } from './components/confirm/ngx-utils-confirm.component';
import { NgxUtilsDialogComponent } from './components/dialog/ngx-utils-dialog.component';
import { NgxUtilsDownloadComponent } from './components/download/ngx-utils-download.component';
import { NgxUtilsGalleryComponent } from './components/gallery/ngx-utils-gallery.component';
import { NgxUtilsMapComponent } from './components/map/ngx-utils-map.component';
import { NgxUtilsPreviewComponent } from './components/preview/ngx-utils-preview.component';
import { NgxUtilsToastComponent } from './components/toast/ngx-utils-toast.component';
import { NgxUtilsUploadComponent } from './components/upload/ngx-utils-upload.component';

@Injectable()
export class NgxUtilsService {
    public viewContainerRef?: ViewContainerRef;

    constructor(private readonly bottomSheet: MatBottomSheet, private readonly dialog: MatDialog) {}

    private domError(): void {
        const errors: string[] = [
            'NgxUtilsComponent not addedd to DOM.',
            'Please add <ngx-utils></ngx-utils> at the end of App Component HTML file / template.',
        ];
        console.error(errors.join('\n'));
    }

    //#region BOTTOM SHEET
    private _bottomSheetRef?: MatBottomSheetRef<any>;
    private _bottomSheetConfig: MatBottomSheetConfig = {
        autoFocus: false,
        direction: 'rtl',
        disableClose: true,
        panelClass: 'ngx-utils-bottom-sheet-panel',
    };

    openBottomSheet<R>(title: string, component: ComponentType<any>, callback: (result: R) => void): void;
    openBottomSheet<R>(
        title: string,
        component: ComponentType<any>,
        config: Partial<INgxUtilsBottomSheetConfig>,
        callback: (result: R) => void,
    ): void;
    openBottomSheet<R>(title: string, component: ComponentType<any>, arg1: any, arg2?: any): void {
        const callback: (result: R) => void = arg2 || arg1;
        const config: Partial<INgxUtilsBottomSheetConfig> = typeof arg2 === 'function' ? arg1 : {};

        this._bottomSheetRef = this.bottomSheet.open(NgxUtilsBottomSheetComponent, {
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

    openDialog<R>(title: string, component: ComponentType<any>, callback: (result: R) => void): void;
    openDialog<R>(
        title: string,
        component: ComponentType<any>,
        config: Partial<INgxUtilsDialogConfig>,
        callback: (result: R) => void,
    ): void;
    openDialog<R>(title: string, component: ComponentType<any>, arg1: any, arg2?: any): void {
        const callback: (result: R) => void = arg2 || arg1;
        const config: Partial<INgxUtilsDialogConfig> = typeof arg2 === 'function' ? arg1 : {};

        this._dialogRef = this.dialog.open(NgxUtilsDialogComponent, {
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
    confirm(confirm: NgxUtilsConfirm, item: string, callback: (description?: string) => void): void;
    confirm(confirm: INgxUtilsConfirm, item: string, callback: (description?: string) => void): void;
    confirm(
        confirm: NgxUtilsConfirm,
        item: string,
        config: Partial<INgxUtilsConfirmConfig>,
        callback: (description?: string) => void,
    ): void;
    confirm(
        confirm: INgxUtilsConfirm,
        item: string,
        config: Partial<INgxUtilsConfirmConfig>,
        callback: (description?: string) => void,
    ): void;
    confirm(confirm: NgxUtilsConfirm | INgxUtilsConfirm, item: string, arg1: any, arg2?: any): void {
        const callback: (description?: string) => void = arg2 || arg1;
        const config: Partial<INgxUtilsConfirmConfig> = typeof arg2 === 'function' ? arg1 : {};

        const info: INgxUtilsConfirm = typeof confirm === 'string' ? NgxUtilsConfirmInfo[confirm] : confirm;
        this.bottomSheet
            .open(NgxUtilsConfirmComponent, { ...this._bottomSheetConfig, data: { info, item, config: config || {} } })
            .afterDismissed()
            .subscribe((result: INgxUtilsConfirmResponse) => result && result.confirmed && callback(result.value));
    }
    //#endregion

    //#region IMAGE
    showPreview(image: string, description?: string, html: boolean = false): void {
        this.dialog.open(NgxUtilsPreviewComponent, {
            ...this._dialogFullConfig,
            data: { image, description, html },
        });
    }

    showGallery(
        images: (string | { image: string; description?: string })[],
        index?: number,
        html: boolean = false,
    ): void {
        this.dialog.open(NgxUtilsGalleryComponent, {
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

        this.dialog.open(NgxUtilsMapComponent, {
            ...this._dialogFullConfig,
            data: { zoom, position },
        });
    }
    //#endregion

    //#region TOAST
    private toastIndex: number = 0;
    private toasts: ComponentRef<NgxUtilsToastComponent>[] = [];

    private updateToastsTop(): void {
        let top: number = 0;
        this.toasts.forEach((toast, index: number) => {
            toast.instance.top = `calc(${index / 2}rem + calc(${top}px + 1rem))`;
            top += +toast.instance.elementRef.nativeElement.offsetHeight;
        });
    }

    toast(
        type: 'ERROR' | 'INFO' | 'SUCCESS' | 'WARNING',
        message: string | string[],
        timeout?: number,
        callback?: () => void,
    ): void {
        if (!this.viewContainerRef) return this.domError();

        const toast = this.viewContainerRef.createComponent(NgxUtilsToastComponent);
        toast.instance.index = ++this.toastIndex;
        toast.instance.type = type;
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
    private components: (ComponentRef<NgxUtilsDownloadComponent> | ComponentRef<NgxUtilsUploadComponent<any, any>>)[] =
        [];

    private updateComponentsBottom(): void {
        this.components.forEach((component, index: number) => {
            component.instance.bottom = `calc(${index / 2}rem + calc(${index * 34}px + 1rem))`;
        });
    }

    download(name: string, path: string): void {
        if (!this.viewContainerRef) return this.domError();

        const component = this.viewContainerRef.createComponent(NgxUtilsDownloadComponent);
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

    upload<R, E>(file: File, url: string, config?: Partial<INgxUtilsUpload>): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            if (!this.viewContainerRef) {
                reject(null);
                return this.domError();
            }

            config = config || {};
            const component = this.viewContainerRef.createComponent(NgxUtilsUploadComponent<R, E>);
            component.instance.index = ++this.componentIndex;
            component.instance.file = file;
            component.instance.url = url;
            component.instance.config = {
                header: config.header || {},
                body: config.body || {},
                maxSize: config.maxSize || '0B',
                mimes: config.mimes || [],
            };

            component.instance.close = (response?: R, error?: { status: HttpStatusCode; error: E }) => {
                this.components = this.components.filter((c) => c.instance.index !== component.instance.index);
                this.updateComponentsBottom();
                component.destroy();

                response ? resolve(response) : reject(error);
            };

            this.components.push(component);
            this.updateComponentsBottom();
        });
    }
    //#endregion

    //#region CALENDAR
    private getCalendarConfig(config?: Partial<INgxUtilsCalendarConfig>): INgxUtilsCalendarConfig {
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
    getDate(config: Partial<INgxUtilsCalendarConfig>, callback: (date: Date) => void): void;
    getDate(arg1: any, arg2?: any): void {
        const callback: (date: Date) => void = arg2 || arg1;
        const config: Partial<INgxUtilsCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.dialog
            .open(NgxUtilsCalendarDateComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((date: Date) => date && callback(date));
    }

    getWeek(callback: (period: INgxUtilsCalendarPeriod) => void): void;
    getWeek(config: Partial<INgxUtilsCalendarConfig>, callback: (period: INgxUtilsCalendarPeriod) => void): void;
    getWeek(arg1: any, arg2?: any): void {
        const callback: (period: INgxUtilsCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxUtilsCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.dialog
            .open(NgxUtilsCalendarWeekComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((week: INgxUtilsCalendarPeriod) => week && callback(week));
    }

    getMonth(callback: (period: INgxUtilsCalendarPeriod) => void): void;
    getMonth(config: Partial<INgxUtilsCalendarConfig>, callback: (period: INgxUtilsCalendarPeriod) => void): void;
    getMonth(arg1: any, arg2?: any): void {
        const callback: (period: INgxUtilsCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxUtilsCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.dialog
            .open(NgxUtilsCalendarMonthComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((month: INgxUtilsCalendarPeriod) => month && callback(month));
    }

    getYear(callback: (period: INgxUtilsCalendarPeriod) => void): void;
    getYear(config: Partial<INgxUtilsCalendarConfig>, callback: (period: INgxUtilsCalendarPeriod) => void): void;
    getYear(arg1: any, arg2?: any): void {
        const callback: (period: INgxUtilsCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxUtilsCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.dialog
            .open(NgxUtilsCalendarYearComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((month: INgxUtilsCalendarPeriod) => month && callback(month));
    }
    //#endregion
}
