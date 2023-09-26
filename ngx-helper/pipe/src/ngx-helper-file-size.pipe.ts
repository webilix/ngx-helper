import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperFileSize' })
export class NgxHelperFileSizePipe implements PipeTransform {
    transform(size: number, config?: { english?: boolean }): string {
        return Helper.NUMBER.toFileSize(size, !!config?.english);
    }
}
