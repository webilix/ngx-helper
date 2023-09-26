import { AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

import { NgxHelperService } from '../../ngx-helper.service';
import { NGX_HELPER_LOADING_HEADER } from '../../ngx-helper.values';

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

    @Input() index: number = 0;
    @Input() name: string = '';
    @Input() path: string = '';

    public progress: number = 0;

    constructor(private readonly httpClient: HttpClient, private readonly ngxHelperService: NgxHelperService) {}

    ngAfterViewInit(): void {
        setTimeout(this.download.bind(this), 500);
    }

    download(): void {
        const headers: HttpHeaders = new HttpHeaders().set(NGX_HELPER_LOADING_HEADER, 'N');
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
        // this.ngxHelperService.toast('ERROR', `امکان دانلود فایل ${this.name} وجود ندارد.`);
        this.close();
    }

    close() {}
}
