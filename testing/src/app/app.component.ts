import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
    INgxHelperCalendarPeriod,
    INgxHelperLocation,
    INgxHelperParamsOrder,
    INgxHelperParamsUpdate,
    NgxHelperConnectionService,
    NgxHelperLoadingService,
    NgxHelperLocationService,
    NgxHelperMenu,
    NgxHelperParams,
    NgxHelperService,
    NGX_HELPER_LOADING_HEADER,
} from '@ngx-helper';

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

    public params1: NgxHelperParams[] = [
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

    public order: INgxHelperParamsOrder = {
        type: 'DESC',
        options: [
            { id: 'option-1', title: 'گزینه اول' },
            { id: 'option-2', title: 'گزینه دوم' },
            { id: 'option-3', title: 'گزینه سوم' },
        ],
        default: 'option-2',
    };

    public params2: NgxHelperParams[] = [
        { type: 'FAVORITE', name: 'favorite' },
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
    public params3: NgxHelperParams[] = [
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
    public params3Update: INgxHelperParamsUpdate = {};

    public params4: NgxHelperParams[] = [
        { type: 'FAVORITE', name: 'value_favorite', value: true },
        { type: 'SEARCH', name: 'value_query', value: 'متن جستجو' },
        {
            type: 'SELECT',
            name: 'value_select',
            title: 'گزینه‌ها',
            options: [
                { id: 'option-1', title: 'گزینه اول' },
                { id: 'option-2', title: 'گزینه دوم' },
                { id: 'option-3', title: 'گزینه سوم' },
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
    ];

    public params5: NgxHelperParams[] = [
        { type: 'COMMENT', title: 'فارسی', value: 'مقدار فارسی' },
        { type: 'COMMENT', title: 'انگلیسی', value: 'English value', english: true },
    ];

    public params6: NgxHelperParams[] = [
        { name: 'plate-1', type: 'PLATE', value: ['12', 'ا', '345', '67'].join('-') },
        { name: 'plate-2', type: 'PLATE', value: ['12', 'ا', '345', '67'] },
    ];

    public boxComponent: ComponentType<BoxComponent> = BoxComponent;
    public listComponent: ComponentType<ListComponent> = ListComponent;
    public pipeComponent: ComponentType<PipeComponent> = PipeComponent;
    public valuesComponent: ComponentType<ValuesComponent> = ValuesComponent;

    public singleMenu: NgxHelperMenu[] = [
        { title: 'حذف', click: () => this.log('DELETE'), icon: 'delete', color: 'warn' },
    ];
    public menu: NgxHelperMenu[] = [
        { title: 'عدم نمایش', click: [], hideOn: () => true },
        'SEPERATOR',
        'SEPERATOR',
        { title: 'مشاهده', click: ['/view'] },
        'SEPERATOR',
        'SEPERATOR',
        'SEPERATOR',
        'SEPERATOR',
        { title: 'تنظیمات', click: () => this.log('setting'), icon: 'settings', color: 'accent' },
        { title: 'عدم نمایش', click: [], hideOn: () => true },
        { title: 'ویرایش', click: () => this.log('edit'), icon: 'edit' },
        { title: 'حذف', click: () => this.log('delete'), icon: 'delete', color: 'warn' },
        'SEPERATOR',
        'SEPERATOR',
    ];

    public previousDate: Date = new Date(new Date().getTime() - 60 * 24 * 3600 * 1000);
    public nextDate: Date = new Date(new Date().getTime() + 60 * 24 * 3600 * 1000);

    public paginationCurrent: number = 1;
    public paginationTotal: number = 25;

    public connection: boolean = false;
    private _onConnectionChanged?: Subscription;

    public loading: boolean = false;
    private _onLoadingChanged?: Subscription;

    public location?: INgxHelperLocation | false;

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly ngxHelperService: NgxHelperService,
        private readonly ngxHelperConnectionService: NgxHelperConnectionService,
        private readonly ngxHelperLoadingService: NgxHelperLoadingService,
        private readonly ngxHelperLocationService: NgxHelperLocationService,
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
                { type: 'DATE', name: 'fa_date' },
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

        this.ngxHelperLocationService.getLocation().then(
            (location: INgxHelperLocation) => (this.location = location),
            (error: string) => {
                console.error(error);
                this.location = false;
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
        this.ngxHelperService.download('localhost.html', correct ? 'http://localhost:4200' : 'http://localhost:14200');
    }

    upload(event: Event): void {
        const element: HTMLInputElement = event.target as HTMLInputElement;
        const files: FileList | null = element.files;
        if (!files || files.length === 0) return;

        const file: File | null = files.item(0);
        if (file === null) return;

        const authorization: string =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjM5MzNjZWM1YzU0YTlkOTViOTRkYzllIiwidXNlciI6IjYzN2Q3OTY2ZmU2MTg2ODNmYzcwNmQ4MyIsImlhdCI6MTY3MDU5Mzc3MiwiZXhwIjoxNjc1Nzc3NzcyfQ.UjdX7Uu2Q88yYlLnNq-6IEmbehrXDDKRK-HCt-_U7E8';

        this.ngxHelperService.upload<any, any>(
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
        this.ngxHelperService.toast(type, message, index * 4, () => this.log(`TOAST: ${type}`));
    }

    customToast(): void {
        this.ngxHelperService.toast(
            { icon: 'download', foreColor: '#ccc', backColor: '#246' },
            ['دانلود اطلاعات ثبت شده با موفقیت انجام شد.', 'این پیام با شیوه نمایش سفارشی نمایش داده می‌شود.'],
            25,
        );
    }

    getDate(type: number): void {
        if (type === 5) this.ngxHelperService.getDate((date: Date) => this.log(date));
        else
            this.ngxHelperService.getDate(
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
        if (type === 5) this.ngxHelperService.getWeek((week: INgxHelperCalendarPeriod) => this.log(week));
        else
            this.ngxHelperService.getWeek(
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
        if (type === 5) this.ngxHelperService.getMonth((month: INgxHelperCalendarPeriod) => this.log(month));
        else
            this.ngxHelperService.getMonth(
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
        if (type === 5) this.ngxHelperService.getYear((year: INgxHelperCalendarPeriod) => this.log(year));
        else
            this.ngxHelperService.getYear(
                {
                    value: type === 1 ? new Date('1979-06-03') : null,
                    title: type === 2 ? 'ماه' : null,
                    minDate: type === 3 ? new Date() : null,
                    maxDate: type === 4 ? new Date() : null,
                },
                (year: INgxHelperCalendarPeriod) => this.log(year),
            );
    }

    showButtomSheet(disableClose?: boolean): void {
        this.ngxHelperService.openBottomSheet<boolean>(
            BottomSheetComponent,
            'نمایش BottomSheet',
            { data: { date: new Date() }, disableClose },
            (result) => this.log(result),
        );
    }

    showDialog(disableClose?: boolean): void {
        this.ngxHelperService.openDialog<boolean>(
            DialogComponent,
            'نمایش Dialog',
            { data: { date: new Date() }, disableClose },
            (result) => this.log(result),
        );
    }

    showPreview(description: boolean, html: boolean = false): void {
        this.ngxHelperService.showPreview(
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

        this.ngxHelperService.showGallery(images, index, html);
    }

    showMap(type: number): void {
        type === 1
            ? this.ngxHelperService.showMap(35.715298, 51.404343)
            : type === 2
            ? this.ngxHelperService.showMap({ lat: 35.715298, long: 51.404343 })
            : type === 3
            ? this.ngxHelperService.showMap({ latitude: 35.715298, longitude: 51.404343 })
            : this.ngxHelperService.showMap(35.715298, 51.404343, 11);
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
                ? this.ngxHelperService.confirm('ACTIVE', item, (description) => this.log(description))
                : this.ngxHelperService.confirm(type, item, { title, message, description }, (description) =>
                      this.log(description),
                  )
            : this.ngxHelperService.confirm(
                  { title: 'سفارشی', icon: 'tune', color: 'accent' },
                  item,
                  { title, message, description },
                  (description) => this.log(description),
              );
    }
}
