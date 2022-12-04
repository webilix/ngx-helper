import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { NgxUtilsService } from '@ngx-utils';

@Component({
    selector: 'app-bottom',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public readonly data: any,
        private readonly ngxUtilsService: NgxUtilsService,
    ) {}

    close(result: boolean = false): void {
        this.ngxUtilsService.closeBottomSheet(result);
    }
}
