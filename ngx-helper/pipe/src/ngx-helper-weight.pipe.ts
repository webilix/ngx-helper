import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperWeight' })
export class NgxHelperWeightPipe implements PipeTransform {
    transform(weight: number, config?: { short?: boolean; english?: boolean }): string {
        if (!Helper.IS.number(weight) || weight < 0) return '';

        const getWeight = (...titles: [string, string][]): string => {
            const title: number = config?.short ? 0 : 1;
            const index: number = config?.english ? 0 : 1;
            return Helper.NUMBER.format(+weight.toFixed(2), config?.english ? 'EN' : 'FA') + ' ' + titles[title][index];
        };

        if (weight === 0) return getWeight(['', ''], ['', '']);

        if (weight < 1000) return getWeight(['G', 'گ'], ['Gram', 'گرم']);

        weight /= 1000;
        if (weight < 1000) return getWeight(['K', 'ک'], ['Kilogram', 'کیلو']);

        weight /= 1000;
        if (weight < 1000) return getWeight(['T', 'ت'], ['Tonne', 'تن']);

        weight /= 1000;
        return getWeight(['KT', 'ه'], ['Kilotonne', 'هزار تن']);
    }
}
