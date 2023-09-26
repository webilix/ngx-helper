import { AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpEventType,
    HttpHeaders,
    HttpStatusCode,
} from '@angular/common/http';

import { Helper } from '@webilix/helper-library';

import { NgxHelperToastService } from '@webilix/ngx-helper/toast';

import { INgxHelperUpload } from '../ngx-helper-http.interface';

@Component({
    host: { selector: 'ngx-helper-upload' },
    templateUrl: './ngx-helper-upload.component.html',
    styleUrls: ['./ngx-helper-upload.component.scss'],
    animations: [
        trigger('host', [
            transition(':enter', [
                style({ left: 'calc(-250px - 1rem)' }),
                animate('50ms ease-in-out', style({ left: '1rem' })),
            ]),
        ]),
    ],
})
export class NgxHelperUploadComponent<R, E> implements AfterViewInit {
    @HostBinding('@host') private host: boolean = true;
    @HostBinding('style.bottom') bottom: string = '1rem';

    @Input() index: number = 0;
    @Input() file?: File;
    @Input() url: string = '';
    @Input() config: Partial<INgxHelperUpload> = {};

    public progress: number = 0;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly ngxHelperToastService: NgxHelperToastService,
    ) {}

    ngAfterViewInit(): void {
        setTimeout(this.upload.bind(this), 500);
    }

    upload(): void {
        if (!this.file) return;

        const maxSize: number = Helper.STRING.toFileSize(this.config.maxSize || '0B');
        if (maxSize && this.file.size > maxSize) {
            this.ngxHelperToastService.toast(
                'ERROR',
                `حداکثر حجم فایل می‌تواند ${Helper.NUMBER.toFileSize(maxSize)} باشد.`,
            );
            this.close(undefined, undefined);
            return;
        }

        if (this.config.mimes && this.config.mimes.length !== 0 && !this.config.mimes.includes(this.file.type)) {
            this.ngxHelperToastService.toast('ERROR', [
                'فرمت فایل انتخاب شده مجاز نیست.',
                `فرمت‌های مجاز: ${this.config.mimes.join(', ')}`,
            ]);
            this.close(undefined, undefined);
            return;
        }

        const formData: FormData = new FormData();
        formData.append('file', this.file);

        const body: { [key: string]: any } = this.config.body || {};
        Object.keys(body).forEach((k: string) => formData.append(k, body[k]));

        let headers: HttpHeaders = new HttpHeaders();
        const header: { [key: string]: any } = this.config.header || {};
        Object.keys(header).forEach((key: string) => (headers = headers.set(key, header[key])));

        this.httpClient.post<R>(this.url, formData, { headers, reportProgress: true, observe: 'events' }).subscribe({
            next: (event: HttpEvent<R>) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        const progress: number =
                            event.loaded && event.total ? Math.ceil((event.loaded / event.total) * 1000) / 10 : 0;
                        this.progress = progress <= 100 ? progress : 100;
                        break;

                    case HttpEventType.Response:
                        this.progress = 100;
                        this.close(event.body || undefined);
                        break;
                }
            },
            error: (error: HttpErrorResponse) => this.close(undefined, { status: error.status, error: error.error }),
        });
    }

    close(response?: R, error?: { status: HttpStatusCode; error: E }): void {}
}
