import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxUtilsBankCard' })
export class NgxUtilsBankCardPipe implements PipeTransform {
    transform(value: string, config?: { view?: 'CARD' | 'BANK'; join?: string }): string {
        switch (config?.view) {
            case 'BANK':
                return Helper.BANK.findCard(value)?.title || '';
            default:
                return Helper.STRING.getBankCardView(value, config?.join || '-');
        }
    }
}
