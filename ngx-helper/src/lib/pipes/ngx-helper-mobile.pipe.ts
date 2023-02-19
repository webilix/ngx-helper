import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperMobile' })
export class NgxHelperMobilePipe implements PipeTransform {
    transform(value: string, config?: { join?: string }): string {
        return Helper.STRING.getMobileView(value, config?.join || '-');
    }
}
