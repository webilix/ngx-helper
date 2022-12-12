import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { INgxUtilsConfirm } from '../../types/ngx-utils-confirm';

@Component({
    templateUrl: './ngx-utils-confirm.component.html',
    styleUrls: ['./ngx-utils-confirm.component.scss'],
})
export class NgxUtilsConfirmComponent {
    public info: INgxUtilsConfirm = this.data.info;
    public item: string = this.data.item;
    public title: string | null = this.data.title || null;
    public message: string | null = this.data.message || null;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        private readonly data: { info: INgxUtilsConfirm; item: string; title?: string; message?: string },
        private readonly bottomSheetRef: MatBottomSheetRef<NgxUtilsConfirmComponent>,
    ) {}

    dismiss(result: boolean = false): void {
        this.bottomSheetRef.dismiss(result);
    }
}
