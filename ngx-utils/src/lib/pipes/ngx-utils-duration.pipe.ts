import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';
import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsDuration' })
export class NgxUtilsDurationPipe implements PipeTransform {
    transform(seconds: number, view?: 'FULL' | 'DAY' | 'HOUR'): string;
    transform(date: Date, view?: 'FULL' | 'DAY' | 'HOUR'): string;
    transform(period: { from: Date; to?: Date }, view?: 'FULL' | 'DAY' | 'HOUR'): string;
    transform(value: any, view: 'FULL' | 'DAY' | 'HOUR' = 'FULL'): string {
        let seconds: number = 0;
        if (Validator.VALUE.isNumber(value)) seconds = Math.abs(value);
        else if (Validator.VALUE.isDate(value))
            seconds = Math.floor(Math.abs(new Date().getTime() - value.getTime()) / 1000);
        else if (Validator.VALUE.isObject(value) && Validator.VALUE.isDate(value['from'])) {
            const to: Date = Validator.VALUE.isDate(value['to']) ? value['to'] : new Date();
            seconds = Math.floor(Math.abs(value['from'].getTime() - to.getTime()) / 1000);
        }

        if (seconds === 0) return '';

        const days: number = Math.floor(seconds / (24 * 60 * 60));
        seconds -= days * (24 * 60 * 60);
        const hours: number = Math.floor(seconds / (60 * 60));
        seconds -= hours * (60 * 60);
        const minutes: number = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        const time: string = [hours, minutes, seconds].map((v: number) => v.toString().padStart(2, '0')).join(':');

        switch (view) {
            case 'FULL':
                return (
                    (days !== 0 ? `(${Helper.NUMBER.format(days, 'EN')}) ` : '') +
                    [hours, minutes, seconds].map((v: number) => v.toString().padStart(2, '0')).join(':')
                );
            case 'DAY':
                return Helper.NUMBER.format(days, 'EN');
            case 'HOUR':
                return [days * 24 + hours, minutes, seconds]
                    .map((v: number) => Helper.NUMBER.format(v, 'EN').padStart(2, '0'))
                    .join(':');
        }
    }
}
