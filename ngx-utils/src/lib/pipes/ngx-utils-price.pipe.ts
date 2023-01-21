import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';
import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsPrice' })
export class NgxUtilsPricePipe implements PipeTransform {
    transform(price: number, short: boolean = false, en: boolean = false): string {
        if (!Validator.VALUE.isNumber(price) || price < 0) return '';

        const getPrice = (...titles: [string, string][]): string => {
            const title: number = short ? 0 : 1;
            const index: number = en ? 0 : 1;
            return Helper.NUMBER.format(+price.toFixed(2), en ? 'EN' : 'FA') + ' ' + titles[title][index];
        };

        if (price < 1000) return getPrice(['', ''], ['', '']);

        price /= 1000;
        if (price < 1000) return getPrice(['T', 'ه'], ['Thousand', 'هزار']);

        price /= 1000;
        if (price < 1000) return getPrice(['M', 'م'], ['Million', 'میلیون']);

        price /= 1000;
        return getPrice(['B', 'د'], ['Billion', 'میلیارد']);
    }
}
