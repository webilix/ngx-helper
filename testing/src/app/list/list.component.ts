import { Component } from '@angular/core';

import { NgxHelperListMenu } from '@webilix/ngx-helper/list';

interface IList {
    id: string;
    title: string;
    description?: string;
    deactive?: boolean;
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent {
    public log = console.log;

    public list: IList[] = [
        { id: '1', title: 'آیتم اول', description: 'توضیحات آیتم اول در این بخش نمایش داده می‌شود.' },
        { id: '2', title: 'آیتم دوم' },
        {
            id: '3',
            title: 'آیتم سوم',
            description:
                'توضیحات این آیتم دارای دو خط است و باید به صورت صحیح نمایش داده شود.' + '\n' + 'خط دوم توضیحات',
        },
        {
            id: '4',
            title: 'آیتم سوم',
            description:
                'توضیحات این آیتم دارای دو خط است و باید به صورت صحیح نمایش داده شود.' + '\n' + 'خط دوم توضیحات',
        },
        { id: '5', title: 'غیرفعال', deactive: true },
        { id: '6', title: 'غیرفعال به همراه توضیحات', description: 'این آیتم غیرفعال شده است.', deactive: true },
        { id: '7', title: 'این گزینه دارای عنوان طولانی است و برای بررسی نمایش صحیح عنوان ثبت شده است.' },
        {
            id: '8',
            title: 'این گزینه دارای عنوان طولانی است و برای بررسی نمایش صحیح عنوان ثبت شده است.',
            description:
                'عنوان کامل این گزینه را می‌توانید در خط زیر مشاهده کنید.' +
                '\n' +
                'این گزینه دارای عنوان طولانی است و برای بررسی نمایش صحیح عنوان ثبت شده است.',
        },
    ];

    public empty: NgxHelperListMenu<IList>[] = [
        'DIVIDER',
        {
            icon: 'check_box',
            click: ['/active', ':ID'],
            title: 'فعال کردن',
            hideOn: () => true,
        },
        'DIVIDER',
    ];

    public menu: NgxHelperListMenu<IList>[] = [
        {
            icon: 'check_box',
            click: ['/active', ':ID'],
            title: 'فعال کردن',
            color: 'accent',
            hideOn: (data) => !data.deactive,
        },
        {
            icon: 'disabled_by_default',
            click: ['/deactive', ':ID'],
            title: 'غیرفعال کردن',
            color: 'accent',
            hideOn: (data) => !!data.deactive,
        },
        'DIVIDER',
        { icon: 'edit', click: (id: string) => this.log('UPDATE', id), title: 'ویرایش' },
        { icon: '', click: [], title: 'عدم نمایش', hideOn: () => true },
        {
            icon: 'delete',
            click: (id: string) => this.log('DELETE', id),
            title: 'حذف',
            color: 'warn',
            disableOn: (data) => +data.id % 2 === 0,
        },
    ];
}
