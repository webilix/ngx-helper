import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';

import { NgxHelperDownloadComponent, NgxHelperUploadComponent } from './components';
import { INgxHelperUpload } from './interfaces';

@Injectable()
export class NgxHelperService {
    public viewContainerRef?: ViewContainerRef;

    constructor(private readonly httpClient: HttpClient) {}

    private domError(): void {
        const errors: string[] = [
            'NgxHelperComponent not addedd to DOM.',
            'Please add <ngx-helper></ngx-helper> at the end of App Component HTML file / template.',
        ];
        console.error(errors.join('\n'));
    }

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
                        // this.toast('ERROR', 'امکان دانلود فایل وجود ندارد.');
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
