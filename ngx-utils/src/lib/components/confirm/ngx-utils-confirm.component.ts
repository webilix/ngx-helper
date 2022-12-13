import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Validator } from '@webilix/validator-library';

import { INgxUtilsConfirm, INgxUtilsConfirmConfig, INgxUtilsConfirmResponse } from '../../types/ngx-utils-confirm';

@Component({
    templateUrl: './ngx-utils-confirm.component.html',
    styleUrls: ['./ngx-utils-confirm.component.scss'],
})
export class NgxUtilsConfirmComponent {
    @ViewChild('ngxUtilsConfirmDescription') private readonly descriptionElementRef?: ElementRef;

    public info: INgxUtilsConfirm = this.data.info;
    public item: string = this.data.item;
    public config: INgxUtilsConfirmConfig = this.data.config;

    public error: boolean = false;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        private readonly data: { info: INgxUtilsConfirm; item: string; config: INgxUtilsConfirmConfig },
        private readonly bottomSheetRef: MatBottomSheetRef<NgxUtilsConfirmComponent>,
    ) {}

    dismiss(confirmed: boolean = false): void {
        let value: string | null | undefined = undefined;

        if (confirmed && this.config.description && this.descriptionElementRef) {
            const element: HTMLTextAreaElement = this.descriptionElementRef.nativeElement;
            const description: string = element.value.trim();
            if (this.config.description === 'REQUIRED' && Validator.VALUE.isEmpty(description)) {
                this.error = true;
                element.focus();
                return;
            }

            value = Validator.VALUE.isEmpty(description) ? null : description;
        }

        const response: INgxUtilsConfirmResponse = { confirmed, value };
        this.bottomSheetRef.dismiss(response);
    }
}
