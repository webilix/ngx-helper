import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { NgxHelperService } from '@webilix/ngx-helper';

@Component({
    selector: 'app-bottom',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public readonly data: any,
        private readonly ngxHelperService: NgxHelperService,
    ) {}

    close(result: boolean = false): void {
        this.ngxHelperService.closeBottomSheet(result);
    }
}
