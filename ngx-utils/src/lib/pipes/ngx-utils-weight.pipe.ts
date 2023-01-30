import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';
import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsWeight' })
export class NgxUtilsWeightPipe implements PipeTransform {
    transform(weight: number, short: boolean = false, en: boolean = false): string {
        if (!Validator.VALUE.isNumber(weight) || weight < 0) return '';

        const getWeight = (...titles: [string, string][]): string => {
            const title: number = short ? 0 : 1;
            const index: number = en ? 0 : 1;
            return Helper.NUMBER.format(+weight.toFixed(2), en ? 'EN' : 'FA') + ' ' + titles[title][index];
        };

        if (weight === 0) return getWeight(['', ''], ['', '']);

        if (weight < 1000) return getWeight(['G', 'گ'], ['Gram', 'گرم']);

        weight /= 1000;
        if (weight < 1000) return getWeight(['K', 'ک'], ['Kilogram', 'کیلو']);

        weight /= 1000;
        return getWeight(['T', 'ت'], ['Tonne', 'تن']);
    }
}
