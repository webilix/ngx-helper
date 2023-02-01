import { Inject, Pipe, PipeTransform } from '@angular/core';

import { JalaliDateTime } from '@webilix/jalali-date-time';
import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxUtilsJalali' })
export class NgxUtilsJalaliPipe implements PipeTransform {
    constructor(@Inject('NGX_UTILS_TIMEZONE') public readonly timezone: string) {}

    transform(date: Date, config?: { format?: string | 'FULL' | 'DATE' | 'TIME'; timezone?: string }): string {
        if (!Helper.IS.date(date)) return '';

        const jalali = JalaliDateTime({ timezone: this.timezone });
        const timezones: string[] = jalali.timezones();

        const timezone: string =
            config?.timezone && timezones.includes(config.timezone) ? config.timezone : 'Asia/Tehran';
        const type: string | 'FULL' | 'DATE' | 'TIME' = config?.format || 'DATE';
        const format: string =
            type === 'FULL' ? 'W، d N Y H:I:S' : type === 'DATE' ? 'W، d N Y' : type === 'TIME' ? 'H:I:S' : type;
        return jalali.toFullText(date, { timezone: timezones.includes(timezone) ? timezone : 'Asia/Tehran', format });
    }
}
