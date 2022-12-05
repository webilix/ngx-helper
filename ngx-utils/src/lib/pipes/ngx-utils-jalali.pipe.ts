import { Pipe, PipeTransform } from '@angular/core';

import { JalaliDateTime } from '@webilix/jalali-date-time';
import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsJalali' })
export class NgxUtilsJalaliPipe implements PipeTransform {
    transform(date: Date): string;
    transform(date: Date, format: string | 'FULL' | 'DATE' | 'TIME'): string;
    transform(date: Date, timezone: string): string;
    transform(date: Date, format: string | 'FULL' | 'DATE' | 'TIME', timezone: string): string;
    transform(date: Date, arg1?: string, arg2?: string): string {
        if (!Validator.VALUE.isDate(date)) return '';

        const jalali = JalaliDateTime();
        const timezones: string[] = jalali.timezones();

        const timezone: string = arg1 && timezones.includes(arg1) ? arg1 : arg2 || 'Asia/Tehran';
        const type: string | 'FULL' | 'DATE' | 'TIME' = arg1 && !jalali.timezones().includes(arg1) ? arg1 : 'DATE';
        const format: string =
            type === 'FULL' ? 'W، d N Y H:I:S' : type === 'DATE' ? 'W، d N Y' : type === 'TIME' ? 'H:I:S' : type;
        return jalali.toFullText(date, { timezone: timezones.includes(timezone) ? timezone : 'Asia/Tehran', format });
    }
}
