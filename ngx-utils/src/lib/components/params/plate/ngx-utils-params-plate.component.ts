import { Component, ElementRef, ViewChild } from '@angular/core';

import { Helper } from '@webilix/helper-library';

import { NgxUtilsService } from '../../../ngx-utils.service';

@Component({
    templateUrl: './ngx-utils-params-plate.component.html',
    styleUrls: ['./ngx-utils-params-plate.component.scss'],
})
export class NgxUtilsParamsPlateComponent {
    @ViewChild('plateLeft') private readonly plateLeft?: ElementRef;

    public plate?: string[];
    public letters: string[] = Helper.PLATE.letters;

    constructor(private readonly ngxUtilsService: NgxUtilsService) {}

    setPlate(left: string, letter: string, right: string, iran: string): void {
        const plate: string[] = [left, letter, right, iran];
        this.plate = Helper.IS.plate(plate) ? plate : undefined;
    }

    setValue(): void {
        if (!this.plate || !Helper.IS.plate(this.plate)) return;
        this.ngxUtilsService.closeBottomSheet(this.plate.join('-'));
    }
}
