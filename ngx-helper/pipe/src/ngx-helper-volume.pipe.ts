import { Pipe, PipeTransform } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperVolume' })
export class NgxHelperVolumePipe implements PipeTransform {
    transform(volume: number, config?: { short?: boolean; english?: boolean }): string {
        if (!Helper.IS.number(volume) || volume < 0) return '';

        const getVolume = (...titles: [string, string][]): string => {
            const title: number = config?.short ? 0 : 1;
            const index: number = config?.english ? 0 : 1;
            return Helper.NUMBER.format(+volume.toFixed(2), config?.english ? 'EN' : 'FA') + ' ' + titles[title][index];
        };

        if (volume === 0) return getVolume(['', ''], ['', '']);

        if (volume < 1000) return getVolume(['ML', 'م'], ['Milliliter', 'میلی لیتر']);

        volume /= 1000;
        return getVolume(['L', 'ل'], ['Liter', 'لیتر']);
    }
}
