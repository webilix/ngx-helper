import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';
import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsPrice' })
export class NgxUtilsPricePipe implements PipeTransform {
    transform(price: number, short: boolean = false, en: boolean = false): string {
        if (!Validator.VALUE.isNumber(price) || price < 0) return '';

        if (price < 1000) return Helper.NUMBER.format(+price.toFixed(2), en ? 'EN' : 'FA');

        price /= 1000;
        if (price < 1000)
            return (
                Helper.NUMBER.format(+price.toFixed(2), en ? 'EN' : 'FA') +
                ' ' +
                (short ? (en ? 'T' : 'ه') : en ? 'Thousand' : 'هزار')
            );

        price /= 1000;
        return (
            Helper.NUMBER.format(+price.toFixed(2), en ? 'EN' : 'FA') +
            ' ' +
            (short ? (en ? 'M' : 'م') : en ? 'Million' : 'میلیون')
        );
    }
}
