import { Component } from '@angular/core';

import { NgxUtilsListMenu } from '@ngx-utils';

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

    public menu: NgxUtilsListMenu<IList>[] = [
        {
            icon: 'check_box',
            title: 'فعال کردن',
            color: 'accent',
            route: ['/active', ':ID'],
            hideOn: (data) => !data.deactive,
        },
        {
            icon: 'disabled_by_default',
            title: 'غیرفعال کردن',
            color: 'accent',
            route: ['/deactive', ':ID'],
            hideOn: (data) => !!data.deactive,
        },
        'SEPERATOR',
        { icon: 'edit', title: 'ویرایش', action: (id: string) => this.log('UPDATE', id) },
        { icon: 'delete', title: 'حذف', color: 'warn', action: (id: string) => this.log('DELETE', id) },
    ];
}
