import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperPeriod' })
export class NgxHelperPeriodPipe implements PipeTransform {
    transform(date: Date, config?: { timezone?: string }): string;
    transform(period: { from: Date; to?: Date }, config?: { timezone?: string }): string;
    transform(value: any, config?: { timezone?: string }): string {
        const from: Date = Helper.IS.date(value) ? value : value.from;
        const to: Date = Helper.IS.date(value) ? new Date() : value.to || new Date();

        return config?.timezone
            ? Helper.DATE.jalaliPeriod(from, to, config.timezone)
            : Helper.DATE.jalaliPeriod(from, to);
    }
}
