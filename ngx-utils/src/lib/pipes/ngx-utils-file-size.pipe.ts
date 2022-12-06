import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxUtilsFileSize' })
export class NgxUtilsFileSizePipe implements PipeTransform {
    transform(size: number, english: boolean = false): string {
        return Helper.NUMBER.toFileSize(size, english);
    }
}
