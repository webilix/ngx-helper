import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {
    NgxHelperDownloadComponent,
    NgxHelperGalleryComponent,
    NgxHelperPreviewComponent,
    NgxHelperToastComponent,
    NgxHelperUploadComponent,
} from './components';
import { INgxHelperToastConfig, INgxHelperUpload } from './interfaces';
import { NgxHelperToast } from './types';

@Injectable()
export class NgxHelperService {
    public viewContainerRef?: ViewContainerRef;

    constructor(private readonly httpClient: HttpClient, private readonly dialog: MatDialog) {}

    private domError(): void {
        const errors: string[] = [
            'NgxHelperComponent not addedd to DOM.',
            'Please add <ngx-helper></ngx-helper> at the end of App Component HTML file / template.',
        ];
        console.error(errors.join('\n'));
    }

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

    //#region PRINT
    private getPDFBlob(data: string | ArrayBuffer | Blob): Promise<Blob> {
        return new Promise<Blob>((resolve, reject) => {
            if (typeof data === 'string') {
                this.httpClient.get(data, { responseType: 'arraybuffer' }).subscribe({
                    next: (response) => resolve(new Blob([response], { type: 'application/pdf' })),
                    error: () => {
                        this.toast('ERROR', 'امکان دانلود فایل وجود ندارد.');
                        reject();
                    },
                });
            } else resolve(new Blob([data], { type: 'application/pdf' }));
        });
    }

    printPDF(url: string): void;
    printPDF(buffer: ArrayBuffer): void;
    printPDF(blob: Blob): void;
    printPDF(data: any): void {
        this.getPDFBlob(data).then(
            (blob: Blob) => {
                const prevIframe = document.getElementById('ngx-helper-pdf-download-iframe');
                if (prevIframe) document.body.removeChild(prevIframe);

                const src: string = URL.createObjectURL(blob);
                const iframe: HTMLIFrameElement = document.createElement('iframe');
                iframe.id = 'ngx-helper-pdf-download-iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                iframe.src = src;
                iframe.onload = () => iframe.contentWindow?.print();
            },
            () => {},
        );
    }
    //#endregion
}
