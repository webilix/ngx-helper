import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { JalaliDateTime } from '@webilix/jalali-date-time';
import { Helper } from '@webilix/helper-library';

import { NgxHelperValue } from './ngx-helper-value.type';

@Pipe({ name: 'ngxHelperValue' })
export class NgxHelperValuePipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    private getHTML(html: string, block: boolean, english: boolean, ltr: boolean): string {
        const hasPersian = english ? false : Helper.STRING.hasPersian(html);
        const extra: string = hasPersian ? '' : ' class="ngx-helper-en"';
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
        if (Helper.IS.number(value)) seconds = Math.abs(value as number);
        else if (Helper.IS.date(value))
            seconds = Math.floor(Math.abs(new Date().getTime() - (value as Date).getTime()) / 1000);
        else if (Helper.IS.object(value) && Helper.IS.date((value as { from: Date; to?: Date })['from'])) {
            value = value as { from: Date; to?: Date };
            const to: Date = value['to'] && Helper.IS.date(value['to']) ? value['to'] : new Date();
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

    getPeriod(value: Date | { from: Date; to?: Date }, timezone?: string): string {
        const from: Date = Helper.IS.date(value) ? (value as Date) : (value as { from: Date; to?: Date }).from;
        const to: Date = Helper.IS.date(value) ? new Date() : (value as { from: Date; to?: Date }).to || new Date();

        return timezone ? Helper.DATE.jalaliPeriod(from, to, timezone) : Helper.DATE.jalaliPeriod(from, to);
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

    getWeight(weight: number, en: boolean, short: boolean): [number, string] {
        if (weight === 0) return [+weight.toFixed(2), ''];

        if (weight < 1000) return [+weight.toFixed(2), short ? (en ? 'G' : 'گ') : en ? 'Gram' : 'گرم'];

        weight /= 1000;
        if (weight < 1000) return [+weight.toFixed(2), short ? (en ? 'K' : 'ک') : en ? 'Kilogram' : 'کیلو'];

        weight /= 1000;
        if (weight < 1000) return [+weight.toFixed(2), short ? (en ? 'T' : 'ت') : en ? 'Tonne' : 'تن'];

        weight /= 1000;
        return [+weight.toFixed(2), short ? (en ? 'KT' : 'ه') : en ? 'Kilotonne' : 'هزار تن'];
    }

    transform(value: NgxHelperValue, block: boolean = false): SafeHtml {
        if (Helper.IS.empty(value)) return '';

        let html: string = '';
        let english: boolean = false;
        let ltr: boolean = false;
        if (typeof value === 'string') {
            html = Helper.STRING.escapeHTML(value).replace(/(?:\r\n|\r|\n)/g, ' ');
            english = !Helper.STRING.hasPersian(value);
        } else
            switch (value['type']) {
                case 'BANK-CARD':
                    if (!Helper.IS.STRING.bankCard(value.value)) return '';

                    switch (value.view) {
                        case 'BANK':
                            html = Helper.BANK.findCard(value.value)?.title || '';
                            if (html === '') return '';
                            break;
                        default:
                            html = value.join
                                ? Helper.STRING.getBankCardView(value.value, value.join)
                                : Helper.STRING.getBankCardView(value.value);
                            html = !!value.english ? html : Helper.STRING.changeNumbers(html, 'FA');
                            ltr = true;
                            break;
                    }
                    break;

                case 'DATE':
                    html = this.getDate(value.value, value.format, value.timezone);
                    break;

                case 'DURATION':
                    html = this.getDuration(value.value, value.format);
                    html = !!value.english ? html : Helper.STRING.changeNumbers(html, 'FA');
                    html = !!value.english ? html : html.replace(/,/g, value.english ? ',' : '،');
                    english = !!value.english;
                    ltr = true;
                    break;

                case 'ENGLISH':
                    html = Helper.STRING.escapeHTML(value.value);
                    html = html.replace(/(?:\r\n|\r|\n)/g, ' ');
                    english = true;
                    break;

                case 'MOBILE':
                    if (!Helper.IS.STRING.mobile(value.value)) return '';

                    html = value.join
                        ? Helper.STRING.getMobileView(value.value, value.join)
                        : Helper.STRING.getMobileView(value.value);
                    html = !!value.english ? html : Helper.STRING.changeNumbers(html, 'FA');
                    ltr = true;
                    break;

                case 'MULTILINE':
                    html = value.html ? value.value : Helper.STRING.escapeHTML(value.value);
                    html = html.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    english = !!value.english || !Helper.STRING.hasPersian(value.value);
                    break;

                case 'NUMBER':
                    html = Helper.NUMBER.format(value.value, value.english ? 'EN' : 'FA');
                    html = html.replace(/,/g, value.english ? ',' : '،');
                    english = !!value.english;
                    ltr = true;
                    break;

                case 'PERIOD':
                    html = this.getPeriod(value.value, value.timezone);
                    break;

                case 'PRICE':
                    const price: [number, string] = this.getPrice(value.value, !!value.english, !!value.short);
                    const priceExtra: string = !value.english ? '' : ' ngx-helper-en';

                    html = Helper.NUMBER.format(price[0], value.english ? 'EN' : 'FA');
                    html = html.replace(/,/g, value.english ? ',' : '،');
                    html =
                        `<span class="value${priceExtra}">${html}</span>` +
                        (price[1] ? ` <span class="unit">${price[1]}</span>` : '') +
                        (value.currency ? ` <span class="currency">${value.currency}</span>` : '');
                    english = !!value.english;
                    ltr = false;
                    break;

                case 'WEIGHT':
                    const weight: [number, string] = this.getWeight(value.value, !!value.english, !!value.short);
                    const weightExtra: string = !value.english ? '' : ' ngx-helper-en';

                    html = Helper.NUMBER.format(weight[0], value.english ? 'EN' : 'FA');
                    html = html.replace(/,/g, value.english ? ',' : '،');
                    html =
                        `<span class="value${weightExtra}">${html}</span>` +
                        (weight[1] ? ` <span class="unit">${weight[1]}</span>` : '');
                    english = !!value.english;
                    ltr = false;
                    break;
            }

        return this.sanitizer.bypassSecurityTrustHtml(this.getHTML(html, block, english, ltr));
    }
}
