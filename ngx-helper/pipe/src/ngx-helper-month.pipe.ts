import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperMonth' })
export class NgxHelperMonthPipe implements PipeTransform {
    transform(value: number): string {
        if (isNaN(value) || value <= 0) return '';

        const year: number = Math.floor(value / 12);
        const month: number = value - year * 12;
        return (
            (year > 0 ? `${Helper.NUMBER.format(year, 'FA')} سال` : '') +
            (year > 0 && month > 0 ? ' و ' : '') +
            (month > 0 ? `${Helper.NUMBER.format(month)} ماه` : '')
        );
    }
}
