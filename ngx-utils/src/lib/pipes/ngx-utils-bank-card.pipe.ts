import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxUtilsBankCard' })
export class NgxUtilsBankCardPipe implements PipeTransform {
    transform(value: string, join: string = '-'): string {
        return Helper.STRING.getBankCardView(value, join);
    }
}
