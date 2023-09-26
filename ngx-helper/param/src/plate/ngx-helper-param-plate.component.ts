import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { Helper } from '@webilix/helper-library';

import { NgxHelperBottomSheetService } from '@webilix/ngx-helper/bottom-sheet';

@Component({
    host: { selector: 'ngx-helper-param-plate' },
    templateUrl: './ngx-helper-param-plate.component.html',
    styleUrls: ['./ngx-helper-param-plate.component.scss'],
})
export class NgxHelperParamPlateComponent {
    @ViewChild('plateLeft') private readonly plateLeft?: ElementRef;

    public plate?: string[];
    public letter?: string = this.data.letter;
    public letters: string[] = Helper.PLATE.letters;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) private readonly data: { letter?: string },
        private readonly ngxHelperBottomSheetService: NgxHelperBottomSheetService,
    ) {}

    setPlate(left: string, letter: string, right: string, iran: string): void {
        const plate: string[] = [left, letter, right, iran];
        this.plate = Helper.IS.plate(plate) ? plate : undefined;
    }

    setValue(): void {
        if (!this.plate || !Helper.IS.plate(this.plate)) return;
        this.ngxHelperBottomSheetService.close(this.plate.join('-'));
    }
}
