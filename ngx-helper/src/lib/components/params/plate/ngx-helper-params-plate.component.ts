import { Component, ElementRef, ViewChild } from '@angular/core';

import { Helper } from '@webilix/helper-library';

import { NgxHelperService } from '../../../ngx-helper.service';

@Component({
    templateUrl: './ngx-helper-params-plate.component.html',
    styleUrls: ['./ngx-helper-params-plate.component.scss'],
})
export class NgxHelperParamsPlateComponent {
    @ViewChild('plateLeft') private readonly plateLeft?: ElementRef;

    public plate?: string[];
    public letters: string[] = Helper.PLATE.letters;

    constructor(private readonly ngxHelperService: NgxHelperService) {}

    setPlate(left: string, letter: string, right: string, iran: string): void {
        const plate: string[] = [left, letter, right, iran];
        this.plate = Helper.IS.plate(plate) ? plate : undefined;
    }

    setValue(): void {
        if (!this.plate || !Helper.IS.plate(this.plate)) return;
        this.ngxHelperService.closeBottomSheet(this.plate.join('-'));
    }
}
