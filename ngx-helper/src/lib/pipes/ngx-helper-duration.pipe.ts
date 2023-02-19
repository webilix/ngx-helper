import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperDuration' })
export class NgxHelperDurationPipe implements PipeTransform {
    transform(seconds: number, config?: { format?: 'FULL' | 'DAY' | 'HOUR' }): string;
    transform(date: Date, config?: { format?: 'FULL' | 'DAY' | 'HOUR' }): string;
    transform(period: { from: Date; to?: Date }, config?: { format?: 'FULL' | 'DAY' | 'HOUR' }): string;
    transform(value: any, config?: { format?: 'FULL' | 'DAY' | 'HOUR' }): string {
        let seconds: number = 0;
        if (Helper.IS.number(value)) seconds = Math.abs(value);
        else if (Helper.IS.date(value)) seconds = Math.floor(Math.abs(new Date().getTime() - value.getTime()) / 1000);
        else if (Helper.IS.object(value) && Helper.IS.date(value['from'])) {
            const to: Date = Helper.IS.date(value['to']) ? value['to'] : new Date();
            seconds = Math.floor(Math.abs(value['from'].getTime() - to.getTime()) / 1000);
        }

        const days: number = Math.floor(seconds / (24 * 60 * 60));
        seconds -= days * (24 * 60 * 60);
        const hours: number = Math.floor(seconds / (60 * 60));
        seconds -= hours * (60 * 60);
        const minutes: number = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        switch (config?.format || 'FULL') {
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
}
