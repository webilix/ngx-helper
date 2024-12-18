import { Component } from '@angular/core';

import { INgxHelperValue } from '@webilix/ngx-helper/value';

@Component({
    selector: 'app-values',
    templateUrl: './values.component.html',
    styleUrls: ['./values.component.scss'],
})
export class ValuesComponent {
    public values: INgxHelperValue[] = [
        { title: 'عبارت متنی فارسی', value: 'مقدار عبارت متنی فارسی', copy: true },
        {
            title: 'عبارت متنی فارسی',
            value: 'مقدار عبارت متنی فارسی',
            description: 'توضیحات تکمیلی مربوط به مقادیر به این صورت نمایش داده می‌شوند.',
            copy: true,
        },
        {
            title: 'عبارت متنی فارسی ظولانی',
            value: 'مقدار عبارت متنی فارسی طولانی که باید در چند خط نمایش داده شود. این عبارت به صورت چند خطی ثبت نشده است!',
            copy: true,
        },
        { title: 'عبارت متنی انگلیسی', value: 'english text', copy: true },
        { title: 'کارت بانکی', value: { type: 'BANK-CARD', value: '1234123412341238', english: true }, copy: true },
        { title: 'تاریخ', value: { type: 'DATE', value: new Date() }, copy: true },
        {
            title: 'مدت زمان',
            value: { type: 'DURATION', value: new Date(new Date().getTime() - 123456789) },
            copy: true,
        },
        { title: 'ایمیل', value: { type: 'ENGLISH', value: 'email@domain.com' }, copy: true },
        { title: 'موبایل', value: { type: 'MOBILE', value: '09122545391', english: true }, copy: true },
        { title: 'ماه', value: { type: 'MONTH', value: 100 }, copy: true },
        {
            title: 'متن چند خطی فارسی',
            value: { type: 'MULTILINE', value: 'متن\nچند\nخطی\nفارسی' },
            block: true,
            copy: true,
        },
        {
            title: 'متن چند خطی انگلیسی',
            value: { type: 'MULTILINE', value: 'english\nmultiline\ntext' },
            block: true,
            copy: true,
        },
        { title: 'مقدار عددی', value: { type: 'NUMBER', value: 123456789 }, copy: true },
        {
            title: 'دوره زمانی',
            value: { type: 'PERIOD', value: new Date(new Date().getTime() - 123456789) },
            copy: true,
        },
        { title: 'قیمت', value: { type: 'PRICE', value: 12300000, currency: 'تومان' }, copy: true },
        { title: 'حجم', value: { type: 'VOLUME', value: 12300000 }, copy: true },
        { title: 'وزن', value: { type: 'WEIGHT', value: 12300000 }, copy: true },
    ];
}
