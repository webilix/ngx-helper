import { AfterViewInit, Component, HostBinding, Inject, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

import { NgxHelperToastService } from '@webilix/ngx-helper/toast';

@Component({
    host: { selector: 'ngx-helper-download' },
    templateUrl: './ngx-helper-download.component.html',
    styleUrls: ['./ngx-helper-download.component.scss'],
    animations: [
        trigger('host', [
            transition(':enter', [
                style({ left: 'calc(-250px - 1rem)' }),
                animate('50ms ease-in-out', style({ left: '1rem' })),
            ]),
        ]),
    ],
})
export class NgxHelperDownloadComponent implements AfterViewInit {
    @HostBinding('@host') private host: boolean = true;
    @HostBinding('style.bottom') bottom: string = '1rem';

    @Input({ required: true }) index: number = 0;
    @Input({ required: true }) name: string = '';
    @Input({ required: true }) path: string = '';

    public progress: number = 0;

    constructor(
        @Inject('NGX_HELPER_LOADING_HEADER') private readonly loading: string,
        private readonly httpClient: HttpClient,
        private readonly ngxHelperToastService: NgxHelperToastService,
    ) {}

    ngAfterViewInit(): void {
        setTimeout(this.download.bind(this), 500);
    }

    download(): void {
        const headers: HttpHeaders = new HttpHeaders().set(this.loading, 'N');
        this.httpClient
            .get(this.path, { headers, reportProgress: true, observe: 'events', responseType: 'blob' })
            .subscribe({
                next: (event: any) => {
                    switch (event.type) {
                        case HttpEventType.DownloadProgress:
                            const progress: number =
                                event.loaded && event.total ? Math.ceil((event.loaded / event.total) * 1000) / 10 : 0;
                            this.progress = progress <= 100 ? progress : 100;
                            break;

                        case HttpEventType.Response:
                            this.progress = 100;
                            try {
                                const href: string = URL.createObjectURL(event.body);
                                const a: HTMLAnchorElement = document.createElement('a');
                                a.href = href;
                                a.download = this.name;
                                a.click();
                                this.close();
                            } catch (e) {
                                this.error();
                            }
                            break;
                    }
                },
                error: () => this.error(),
            });
    }

    error(): void {
        this.ngxHelperToastService.toast('ERROR', `امکان دانلود فایل ${this.name} وجود ندارد.`);
        this.close();
    }

    close() {}
}
