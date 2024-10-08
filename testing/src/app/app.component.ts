import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Helper, IGeoCoordinates } from '@webilix/helper-library';

import {
    NgxHelperConnectionService,
    NgxHelperLoadingService,
    NGX_HELPER_LOADING_HEADER,
    NgxHelperBottomSheetService,
    NgxHelperConfirmService,
    NgxHelperCoordinatesService,
    NgxHelperDialogService,
    NgxHelperImageService,
    NgxHelperToastService,
    NgxHelperHttpService,
} from '@webilix/ngx-helper';
import { INgxHelperButtonGroup } from '@webilix/ngx-helper/button-group';
import { INgxHelperCalendarPeriod, NgxHelperCalendarService } from '@webilix/ngx-helper/calendar';
import { NgxHelperMenu } from '@webilix/ngx-helper/menu';
import { INgxHelperParamOrder, INgxHelperParamUpdate, NgxHelperParam } from '@webilix/ngx-helper/param';
import { INgxHelperTag } from '@webilix/ngx-helper/tag';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { BoxComponent } from './box/box.component';
import { DialogComponent } from './dialog/dialog.component';
import { ListComponent } from './list/list.component';
import { PipeComponent } from './pipe/pipe.component';
import { ValuesComponent } from './values/values.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    public log = console.log;

    public progressValue: number = 10;

    public params1: NgxHelperParam[] = [
        { type: 'SEARCH', name: 'fa_query' },
        {
            type: 'SELECT',
            name: 'fa_select',
            title: 'گزینه‌ها',
            options: [
                { id: 'option-1', title: 'گزینه اول' },
                { id: 'option-2', title: 'گزینه دوم' },
                { id: 'option-3', title: 'گزینه سوم' },
            ],
        },
        { type: 'DATE', name: 'fa_date' },
    ];

    public order: INgxHelperParamOrder = {
        type: 'DESC',
        options: [
            { id: 'option-1', title: 'گزینه اول' },
            { id: 'option-2', title: 'گزینه دوم' },
            { id: 'option-3', title: 'گزینه سوم' },
        ],
        default: 'option-2',
        flex: 2,
    };

    public params2: NgxHelperParam[] = [
        { type: 'BOOLEAN', name: 'boolean', icon: 'restart_alt' },
        { type: 'SEARCH', name: 'en_query', english: true },
        {
            type: 'SELECT',
            name: 'en_select',
            title: 'گزینه‌ها',
            options: [
                { id: 'option-1', title: '1ST Option' },
                { id: 'option-2', title: '2ND Option' },
                { id: 'option-3', title: '3RD Option' },
            ],
            english: true,
        },
    ];

    public paramsPage: number = 1;
    public selectPage: number = 1;
    public params3: NgxHelperParam[] = [
        {
            type: 'SELECT',
            name: 'fa_select_big',
            title: 'فارسی',
            icon: 'keyboard_hide',
            options: [...Array(100).keys()].map((n: number) => ({ id: (n + 1).toString(), title: (n + 1).toString() })),
        },
        {
            type: 'SELECT',
            name: 'en_select_big',
            title: 'انگلیسی',
            icon: 'keyboard_hide',
            options: [...Array(100).keys()].map((n: number) => ({ id: (n + 1).toString(), title: (n + 1).toString() })),
            english: true,
        },
    ];
    public params3Update: INgxHelperParamUpdate = {};

    public params4: NgxHelperParam[] = [
        'DIVIDER',
        'DIVIDER',
        {
            type: 'MENU',
            name: 'value_menu',
            icon: 'toc',
            title: 'گزینه‌ها',
            options: [
                { title: 'گزینه اول', value: '1ST', icon: 'looks_one' },
                { title: 'گزینه دوم', value: '2ND', icon: 'looks_two' },
                { title: 'گزینه سوم', value: '3RD', icon: 'looks_3' },
            ],
        },
        { type: 'BOOLEAN', name: 'value_boolean', value: true },
        { type: 'SEARCH', name: 'value_query', value: 'متن جستجو' },
        'DIVIDER',
        'DIVIDER',
        'DIVIDER',
        {
            type: 'SELECT',
            name: 'value_select',
            title: 'گزینه‌ها',
            options: [
                { id: 'option-1', title: 'گزینه اول' },
                { id: 'option-2', title: 'گزینه دوم' },
                { id: 'option-3', title: 'گزینه سوم' },
                'DIVIDER',
                { id: 'option-4', title: 'گزینه آخر' },
            ],
            value: 'option-2',
            required: true,
        },
        {
            type: 'SELECT',
            name: 'value_select_full',
            icon: 'keyboard_hide',
            title: 'گزینه‌ها',
            options: [...Array(100).keys()].map((n: number) => ({ id: (n + 1).toString(), title: (n + 1).toString() })),
            value: '2',
            required: true,
        },
        { type: 'DATE', name: 'value_date', value: new Date(), required: true, maxDate: new Date() },
        'DIVIDER',
        'DIVIDER',
    ];

    public params5: NgxHelperParam[] = [
        { type: 'COMMENT', title: 'فارسی', value: 'مقدار فارسی' },
        { type: 'COMMENT', title: 'انگلیسی', value: 'English value', english: true, flex: 2 },
    ];

    public params6: NgxHelperParam[] = [
        { name: 'plate-1', type: 'PLATE', value: ['12', 'ا', '345', '67'].join('-'), width: 90 },
        { name: 'plate-2', type: 'PLATE', value: ['12', 'ا', '345', '67'], width: 100 },
        { name: 'plate-3', type: 'PLATE', letter: 'ع' },
    ];

    public params7: NgxHelperParam[] = [
        {
            type: 'SELECT',
            name: 'tree-1',
            icon: 'keyboard_hide',
            title: 'گزینه‌ها',
            options: [...Array(10).keys()].map((n: number) => ({ id: (n + 1).toString(), title: (n + 1).toString() })),
            list: true,
        },
        {
            type: 'SELECT',
            name: 'tree-2',
            icon: 'keyboard_hide',
            title: 'گزینه‌ها',
            options: [...Array(100).keys()].map((n: number) => ({ id: (n + 1).toString(), title: (n + 1).toString() })),
            list: true,
        },
        {
            type: 'SELECT',
            name: 'tree-3',
            icon: 'keyboard_hide',
            title: 'گزینه‌ها',
            options: [...Array(100).keys()].map((n: number) => ({ id: (n + 1).toString(), title: (n + 1).toString() })),
            list: true,
            english: true,
        },
    ];

    public buttonGroupMenu: INgxHelperButtonGroup[] = [
        { icon: 'print', title: 'پرینت', action: 'PRINT' },
        { icon: 'file_download', title: 'دانلود', action: 'DOWNLOAD' },
    ];

    public boxComponent: ComponentType<BoxComponent> = BoxComponent;
    public listComponent: ComponentType<ListComponent> = ListComponent;
    public pipeComponent: ComponentType<PipeComponent> = PipeComponent;
    public valuesComponent: ComponentType<ValuesComponent> = ValuesComponent;

    public emptyMenu: NgxHelperMenu[] = ['DIVIDER', { title: 'عدم نمایش', click: [], hideOn: () => true }, 'DIVIDER'];
    public singleMenu: NgxHelperMenu[] = [
        'DIVIDER',
        { title: 'حذف', click: () => this.log('DELETE'), icon: 'delete', color: 'warn' },
        'DIVIDER',
        { title: 'عدم نمایش', click: [], hideOn: () => true },
        'DIVIDER',
    ];
    public menu: NgxHelperMenu[] = [
        { title: 'عدم نمایش', click: [], hideOn: () => true },
        'DIVIDER',
        'DIVIDER',
        { title: 'مشاهده', click: ['/view'] },
        'DIVIDER',
        'DIVIDER',
        'DIVIDER',
        'DIVIDER',
        { title: 'تنظیمات', click: () => this.log('setting'), icon: 'settings', color: 'accent' },
        { title: 'عدم نمایش', click: [], hideOn: () => true },
        { title: 'ویرایش', click: () => this.log('edit'), icon: 'edit' },
        { title: 'حذف', click: () => this.log('delete'), icon: 'delete', color: 'warn' },
        'DIVIDER',
        'DIVIDER',
    ];

    public previousDate: Date = new Date(new Date().getTime() - 60 * 24 * 3600 * 1000);
    public nextDate: Date = new Date(new Date().getTime() + 60 * 24 * 3600 * 1000);

    public paginationCurrent: number = 1;
    public paginationTotal: number = 25;

    public connection: boolean = false;
    private _onConnectionChanged?: Subscription;

    public loading: boolean = false;
    private _onLoadingChanged?: Subscription;

    public coordinates?: IGeoCoordinates | false;

    public tags: INgxHelperTag[] = [
        { value: 'تگ' },
        { icon: 'collections', value: 'تصاویر' },
        { icon: 'add', value: 'دارای آیکون' },
        { icon: 'schedule', value: { type: 'DATE', value: new Date() } },
        { icon: 'schedule', value: { type: 'DATE', value: new Date(), format: 'H:I:S' }, color: 'warn' },
        {
            icon: 'phone_iphone',
            value: { type: 'MOBILE', value: '09123456789', english: true },
            description: 'توضیحات',
            color: 'primary',
        },
        { icon: 'link', value: 'لینک', click: ['/view'] },
        { icon: 'ads_click', value: 'کلیک', click: () => this.log('TAG CLICK') },
    ];

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly httpClient: HttpClient,
        private readonly ngxHelperBottomSheetService: NgxHelperBottomSheetService,
        private readonly ngxHelperCalendarService: NgxHelperCalendarService,
        private readonly ngxHelperConfirmService: NgxHelperConfirmService,
        private readonly ngxHelperCoordinatesService: NgxHelperCoordinatesService,
        private readonly ngxHelperDialogService: NgxHelperDialogService,
        private readonly ngxHelperHttpService: NgxHelperHttpService,
        private readonly ngxHelperImageService: NgxHelperImageService,
        private readonly ngxHelperConnectionService: NgxHelperConnectionService,
        private readonly ngxHelperLoadingService: NgxHelperLoadingService,
        private readonly ngxHelperToastService: NgxHelperToastService,
    ) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.params1 = [
                { type: 'SEARCH', name: 'fa_query', title: 'تست تغییر' },
                {
                    type: 'SELECT',
                    name: 'fa_select',
                    title: 'گزینه‌ها',
                    options: [
                        { id: 'option-1', title: 'گزینه اول' },
                        { id: 'option-2', title: 'گزینه دوم' },
                        { id: 'option-3', title: 'گزینه سوم' },
                        { id: 'option-4', title: 'گزینه چهارم' },
                    ],
                },
                'DIVIDER',
                { type: 'DATE', name: 'fa_date' },
                { type: 'DATE', name: 'fa_date_2', title: 'تاریخ دوم' },
            ];
        }, 2000);

        this.log(NGX_HELPER_LOADING_HEADER);

        this.connection = this.ngxHelperConnectionService.connection;
        this._onConnectionChanged = this.ngxHelperConnectionService.onConnectionChanged.subscribe({
            next: (connection: boolean) => (this.connection = connection),
        });

        this.loading = this.ngxHelperLoadingService.loading;
        this._onLoadingChanged = this.ngxHelperLoadingService.onLoadingChanged.subscribe({
            next: (loading: boolean) => {
                this.log(`LOADING: ${(this.loading = loading)}`);
                this.changeDetectorRef.detectChanges();
            },
        });

        Helper.GEO.coordinates().then(
            (coordinates: IGeoCoordinates) => (this.coordinates = coordinates),
            (error: string) => {
                console.error(error);
                this.coordinates = false;
            },
        );
    }

    ngOnDestroy(): void {
        this._onConnectionChanged?.unsubscribe();
        this._onLoadingChanged?.unsubscribe();
    }

    changeParam(): void {
        this.params3Update = {
            fa_select_big: (Math.floor(Math.random() * 99) + 1).toString(),
            en_select_big: (Math.floor(Math.random() * 99) + 1).toString(),
        };
    }

    download(correct: boolean): void {
        this.ngxHelperHttpService.download(
            'localhost.html',
            correct ? 'http://localhost:4200' : 'http://localhost:14200',
        );
    }

    upload(event: Event): void {
        const element: HTMLInputElement = event.target as HTMLInputElement;
        const files: FileList | null = element.files;
        if (!files || files.length === 0) return;

        const file: File | null = files.item(0);
        if (file === null) return;

        const authorization: string =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjM5MzNjZWM1YzU0YTlkOTViOTRkYzllIiwidXNlciI6IjYzN2Q3OTY2ZmU2MTg2ODNmYzcwNmQ4MyIsImlhdCI6MTY3MDU5Mzc3MiwiZXhwIjoxNjc1Nzc3NzcyfQ.UjdX7Uu2Q88yYlLnNq-6IEmbehrXDDKRK-HCt-_U7E8';

        this.ngxHelperHttpService.upload<any, any>(
            file,
            'http://localhost:3000/upload',
            {
                header: { authorization },
                body: { type: 'INQUIRY' },
                maxSize: '1MB',
                mimes: ['image/png', 'image/gif', 'image/jpeg'],
            },
            (response: any) => this.log('RESPONSE', response),
            (error: any) => this.log('ERROR', error),
        );
    }

    toast(type: 'ERROR' | 'INFO' | 'SUCCESS' | 'WARNING'): void {
        const index: number = type === 'ERROR' ? 0 : type === 'INFO' ? 1 : type === 'SUCCESS' ? 2 : 3;
        const message: string[] = Array(index + 1).fill('نمایش تست: شیوه نمایش ' + type);
        this.ngxHelperToastService.toast(type, message, index * 4, () => this.log(`TOAST: ${type}`));
    }

    toastERROR(): void {
        this.ngxHelperToastService.error('ERROR');
    }

    toastINFO(): void {
        this.ngxHelperToastService.info('INFO');
    }

    toastSUCCESS(): void {
        this.ngxHelperToastService.success('SUCCESS');
    }

    toastWARNING(): void {
        this.ngxHelperToastService.warning('WARNING');
    }

    customToast(): void {
        this.ngxHelperToastService.toast(
            { icon: 'download', foreColor: '#ccc', backColor: '#246' },
            ['دانلود اطلاعات ثبت شده با موفقیت انجام شد.', 'این پیام با شیوه نمایش سفارشی نمایش داده می‌شود.'],
            25,
        );
    }

    getDate(type: number): void {
        if (type === 5) this.ngxHelperCalendarService.getDate((date: Date) => this.log(date));
        else
            this.ngxHelperCalendarService.getDate(
                {
                    value: type === 1 ? new Date('1979-06-03') : null,
                    title: type === 2 ? 'تاریخ' : null,
                    minDate: type === 3 ? new Date() : null,
                    maxDate: type === 4 ? new Date() : null,
                },
                (date: Date) => this.log(date),
            );
    }

    getWeek(type: number): void {
        if (type === 5) this.ngxHelperCalendarService.getWeek((week: INgxHelperCalendarPeriod) => this.log(week));
        else
            this.ngxHelperCalendarService.getWeek(
                {
                    value: type === 1 ? new Date('1979-06-03') : null,
                    title: type === 2 ? 'هفته' : null,
                    minDate: type === 3 ? new Date() : null,
                    maxDate: type === 4 ? new Date() : null,
                },
                (week: INgxHelperCalendarPeriod) => this.log(week),
            );
    }

    getMonth(type: number): void {
        if (type === 5) this.ngxHelperCalendarService.getMonth((month: INgxHelperCalendarPeriod) => this.log(month));
        else
            this.ngxHelperCalendarService.getMonth(
                {
                    value: type === 1 ? new Date('1979-06-03') : null,
                    title: type === 2 ? 'ماه' : null,
                    minDate: type === 3 ? new Date() : null,
                    maxDate: type === 4 ? new Date() : null,
                },
                (month: INgxHelperCalendarPeriod) => this.log(month),
            );
    }

    getYear(type: number): void {
        if (type === 5) this.ngxHelperCalendarService.getYear((year: INgxHelperCalendarPeriod) => this.log(year));
        else
            this.ngxHelperCalendarService.getYear(
                {
                    value: type === 1 ? new Date('1979-06-03') : null,
                    title: type === 2 ? 'ماه' : null,
                    minDate: type === 3 ? new Date() : null,
                    maxDate: type === 4 ? new Date() : null,
                },
                (year: INgxHelperCalendarPeriod) => this.log(year),
            );
    }

    showButtomSheet(disableClose?: boolean, padding?: string, autoFocus?: boolean): void {
        this.ngxHelperBottomSheetService.open<boolean>(
            BottomSheetComponent,
            'نمایش BottomSheet',
            { data: { date: new Date() }, disableClose, padding, autoFocus },
            (result) => this.log(result),
        );
    }

    showDialog(disableClose?: boolean, padding?: string, autoFocus?: boolean): void {
        this.ngxHelperDialogService.open<boolean>(
            DialogComponent,
            'نمایش Dialog',
            { data: { date: new Date() }, disableClose, padding, autoFocus },
            (result) => this.log(result),
        );
    }

    showPreview(description: boolean, html: boolean = false): void {
        this.ngxHelperImageService.preview(
            'https://angular.io/assets/images/logos/angular/logo-nav@2x.png',
            description
                ? 'شیوه نمایش توضیحات مربوط به تصویر در هنگام استفاده از کامپوننت پیش‌نمایش تصویر' +
                      '\n' +
                      'نمایش در چند خط با کدهای <strong style="color: red;">HTML</strong>'
                : undefined,
            html,
        );
    }

    showGallery(index?: number, html: boolean = false): void {
        const images: (string | { image: string; description?: string })[] = [
            'https://angular.io/assets/images/logos/angular/logo-nav@2x.png',
            { image: 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png' },
            {
                image: 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png',
                description:
                    'شیوه نمایش توضیحات مربوط به تصویر در هنگام استفاده از کامپوننت پیش‌نمایش تصویر' +
                    '\n' +
                    'نمایش در چند خط با کدهای <strong style="color: red;">HTML</strong>',
            },
        ];

        this.ngxHelperImageService.gallery(images, index, html);
    }

    confirm(
        type?: 'ACTIVE' | 'ARCHIVE' | 'BLOCK' | 'DEACTIVE' | 'DELETE' | 'EMPTY',
        description: boolean | 'REQUIRED' = false,
    ): void {
        const item: string = 'نوع اطلاعات';
        const title: string = 'عنوان اطلاعات';
        const message: string = 'این پیام برای تست نحوه نمایش پیام‌های مربوط به تاییدیه، اضافه شده است.';

        type
            ? type === 'EMPTY'
                ? this.ngxHelperConfirmService.verify('ACTIVE', item, (description) => this.log(description))
                : this.ngxHelperConfirmService.verify(type, item, { title, message, description }, (description) =>
                      this.log(description),
                  )
            : this.ngxHelperConfirmService.verify(
                  { title: 'سفارشی', icon: 'tune', color: 'accent' },
                  item,
                  { title, message, description, question: 'آیا می‌خواهید سوال سفارشی نمایش داده شود؟' },
                  (description) => this.log(description),
              );
    }

    getCoordinates(type: number): void {
        (type === 1
            ? this.ngxHelperCoordinatesService.get({ zoom: 5 })
            : type === 2
            ? this.ngxHelperCoordinatesService.get({ image: '/assets/pin.png', zoom: 5 })
            : type === 3
            ? this.ngxHelperCoordinatesService.get({
                  image: '/assets/pin.png',
                  view: { latitude: 35.6997382, longitude: 51.3380603 },
              })
            : this.ngxHelperCoordinatesService.get(
                  { latitude: 35.6997382, longitude: 51.3380603 },
                  { image: '/assets/pin.png', view: { latitude: 0, longitude: 0 } },
              )
        ).then(
            (coordinates) => this.log(coordinates),
            () => {},
        );
    }

    showCoordinates(type: number): void {
        switch (type) {
            case 1:
                this.ngxHelperCoordinatesService.show(
                    { latitude: 35.6997382, longitude: 51.3380603 },
                    { image: '/assets/pin.png' },
                );
                break;
            case 2:
                this.ngxHelperCoordinatesService.show({ latitude: 35.6997382, longitude: 51.3380603 });
                break;
            case 3:
                this.ngxHelperCoordinatesService.show(
                    { latitude: 35.6997382, longitude: 51.3380603 },
                    { image: '/assets/pin.png', zoom: 17 },
                );
                break;
        }
    }

    print(type: 'URL' | 'BUFFER' | 'BLOB'): void {
        const url: string = 'http://localhost:4200/assets/dummy.pdf';
        switch (type) {
            case 'URL':
                this.ngxHelperHttpService.printPDF(url);
                break;
            case 'BUFFER':
                this.httpClient.get(url, { responseType: 'arraybuffer' }).subscribe((response) => {
                    this.ngxHelperHttpService.printPDF(response);
                });
                break;
            case 'BLOB':
                this.httpClient.get(url, { responseType: 'blob' }).subscribe((response) => {
                    this.ngxHelperHttpService.printPDF(response);
                });
                break;
        }
    }
}
