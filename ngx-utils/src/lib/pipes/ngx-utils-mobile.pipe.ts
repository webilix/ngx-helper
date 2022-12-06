import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxUtilsMobile' })
export class NgxUtilsMobilePipe implements PipeTransform {
    transform(value: string, join: string = '-'): string {
        return Helper.STRING.getMobileView(value, join);
    }
}
