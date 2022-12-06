import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';
import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsFileSize' })
export class NgxUtilsFileSizePipe implements PipeTransform {
    transform(size: number, english: boolean = false): string {
        if (!Validator.VALUE.isNumber(size) || size < 0) return '';

        if (size < 1000) return `${size.toString()} ${english ? 'B' : 'بایت'}`;

        size /= 1024;
        if (size < 1000) return `${size.toFixed(2)} ${english ? 'KB' : 'کیلوبایت'}`;

        size /= 1024;
        if (size < 1000) return `${size.toFixed(2)} ${english ? 'MB' : 'مگابایت'}`;

        size /= 1024;
        if (size < 1000) return `${size.toFixed(2)} ${english ? 'GB' : 'گیگابایت'}`;

        size /= 1024;
        return (
            Helper.NUMBER.format(+size.toFixed(2), english ? 'EN' : 'FA').replace(/,/g, english ? ',' : '،') +
            (english ? ' TB' : ' ترابایت')
        );
    }
}
