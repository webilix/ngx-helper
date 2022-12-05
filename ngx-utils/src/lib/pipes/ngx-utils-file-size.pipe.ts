import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';
import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsFileSize' })
export class NgxUtilsFileSizePipe implements PipeTransform {
    transform(size: number): string {
        if (!Validator.VALUE.isNumber(size) || size < 0) return '';

        if (size < 1000) return size.toString() + ' بایت';

        size /= 1024;
        if (size < 1000) return size.toFixed(2) + ' کیلوبایت';

        size /= 1024;
        if (size < 1000) return size.toFixed(2) + ' مگابایت';

        size /= 1024;
        if (size < 1000) return size.toFixed(2) + ' گیگابایت';

        size /= 1024;
        return Helper.NUMBER.format(+size.toFixed(2)) + ' ترابایت';
    }
}
