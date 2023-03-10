import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperPrice' })
export class NgxHelperPricePipe implements PipeTransform {
    transform(price: number, config?: { currency?: string; short?: boolean; english?: boolean }): string {
        if (!Helper.IS.number(price) || price < 0) return '';

        const getPrice = (...titles: [string, string][]): string => {
            const value: string = Helper.NUMBER.format(+price.toFixed(2), config?.english ? 'EN' : 'FA');
            const unit: string = titles[config?.short ? 0 : 1][config?.english ? 0 : 1];
            const currency: string = config?.currency ? ' ' + config?.currency : '';

            return `${value} ${unit}${currency}`;
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
