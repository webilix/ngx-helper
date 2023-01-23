import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Helper } from '@webilix/helper-library';
import { JalaliDateTime } from '@webilix/jalali-date-time';
import { Validator } from '@webilix/validator-library';

import { NgxUtilsValue } from '../types/ngx-utils-value';

@Pipe({ name: 'ngxUtilsValue' })
export class NgxUtilsValuePipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    private getHTML(html: string, block: boolean, english: boolean, ltr: boolean): string {
        const hasPersian = english ? false : Helper.STRING.hasPersian(html);
        const extra: string = hasPersian ? '' : ' class="ngx-utils-en"';
        return block
            ? `<div${extra}${ltr ? ' style="direction: ltr;"' : ''}>${html}</div>`
            : `<span${extra}${ltr ? ' style="direction: ltr; display: inline-block;"' : ''}>${html}</span>`;
    }

    getDate(date: Date, format: string | 'FULL' | 'DATE' | 'TIME' = 'DATE', timezone?: string): string {
        format =
            format === 'FULL'
                ? 'W، d N Y H:I:S'
                : format === 'DATE'
                ? 'W، d N Y'
                : format === 'TIME'
                ? 'H:I:S'
                : format;
        return JalaliDateTime({ timezone }).toFullText(date, { format });
    }

    getDuration(value: number | Date | { from: Date; to?: Date }, view: 'FULL' | 'DAY' | 'HOUR' = 'FULL'): string {
        let seconds: number = 0;
        if (Validator.VALUE.isNumber(value)) seconds = Math.abs(value as number);
        else if (Validator.VALUE.isDate(value))
            seconds = Math.floor(Math.abs(new Date().getTime() - (value as Date).getTime()) / 1000);
        else if (
            Validator.VALUE.isObject(value) &&
            Validator.VALUE.isDate((value as { from: Date; to?: Date })['from'])
        ) {
            value = value as { from: Date; to?: Date };
            const to: Date = value['to'] && Validator.VALUE.isDate(value['to']) ? value['to'] : new Date();
            seconds = Math.floor(Math.abs(value['from'].getTime() - to.getTime()) / 1000);
        }

        const days: number = Math.floor(seconds / (24 * 60 * 60));
        seconds -= days * (24 * 60 * 60);
        const hours: number = Math.floor(seconds / (60 * 60));
        seconds -= hours * (60 * 60);
        const minutes: number = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        switch (view) {
            case 'FULL':
                return (
                    (days !== 0 ? `(${Helper.NUMBER.format(days, 'EN')}) ` : '') +
                    [hours, minutes, seconds].map((v: number) => v.toString().padStart(2, '0')).join(':')
                );
            case 'DAY':
                return Helper.NUMBER.format(days + (hours !== 0 || minutes !== 0 ? 1 : 0), 'EN');
            case 'HOUR':
                return [days * 24 + hours, minutes, seconds]
                    .map((v: number) => Helper.NUMBER.format(v, 'EN').padStart(2, '0'))
                    .join(':');
        }
    }

    getPrice(price: number, en: boolean, short: boolean): [number, string] {
        if (price < 1000) return [+price.toFixed(2), ''];

        price /= 1000;
        if (price < 1000) return [+price.toFixed(2), short ? (en ? 'T' : 'ه') : en ? 'Thousand' : 'هزار'];

        price /= 1000;
        if (price < 1000) return [+price.toFixed(2), short ? (en ? 'M' : 'م') : en ? 'Million' : 'میلیون'];

        price /= 1000;
        return [+price.toFixed(2), short ? (en ? 'B' : 'د') : en ? 'Billion' : 'میلیارد'];
    }

    transform(value: NgxUtilsValue, block: boolean = false): SafeHtml {
        if (Validator.VALUE.isEmpty(value)) return '';

        let html: string = '';
        let english: boolean = false;
        let ltr: boolean = false;
        if (typeof value === 'string') {
            html = Helper.STRING.escapeHTML(value).replace(/(?:\r\n|\r|\n)/g, ' ');
            english = !Helper.STRING.hasPersian(value);
        } else
            switch (value['type']) {
                case 'BANK-CARD':
                    if (!Validator.STRING.isBankCard(value.value)) return '';

                    html = Helper.STRING.getBankCardView(value.value, value.join);
                    html = !!value.en ? html : Helper.STRING.changeNumbers(html, 'FA');
                    ltr = true;
                    break;

                case 'DATE':
                    html = this.getDate(value.value, value.format, value.timezone);
                    break;

                case 'DURATION':
                    html = this.getDuration(value.value, value.view);
                    html = !!value.en ? html : Helper.STRING.changeNumbers(html, 'FA');
                    html = !!value.en ? html : html.replace(/,/g, value.en ? ',' : '،');
                    english = !!value.en;
                    ltr = true;
                    break;

                case 'EN':
                    html = Helper.STRING.escapeHTML(value.value);
                    html = html.replace(/(?:\r\n|\r|\n)/g, ' ');
                    english = true;
                    break;

                case 'MOBILE':
                    if (!Validator.STRING.isMobile(value.value)) return '';

                    html = Helper.STRING.getMobileView(value.value, value.join);
                    html = !!value.en ? html : Helper.STRING.changeNumbers(html, 'FA');
                    ltr = true;
                    break;

                case 'MULTILINE':
                    html = value.html ? value.value : Helper.STRING.escapeHTML(value.value);
                    html = html.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    english = !!value.en || !Helper.STRING.hasPersian(value.value);
                    break;

                case 'NUMBER':
                    html = Helper.NUMBER.format(value.value, value.en ? 'EN' : 'FA');
                    html = html.replace(/,/g, value.en ? ',' : '،');
                    english = !!value.en;
                    ltr = true;
                    break;

                case 'PRICE':
                    const price: [number, string] = this.getPrice(value.value, !!value.en, !!value.short);
                    const extra: string = !value.en ? '' : ' ngx-utils-en';

                    html = Helper.NUMBER.format(price[0], value.en ? 'EN' : 'FA');
                    html = html.replace(/,/g, value.en ? ',' : '،');
                    html =
                        `<span class="value${extra}">${html}</span>` +
                        (price[1] ? ` <span class="unit">${price[1]}</span>` : '');
                    english = !!value.en;
                    ltr = false;
                    break;
            }

        return this.sanitizer.bypassSecurityTrustHtml(this.getHTML(html, block, english, ltr));
    }
}
