import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Helper } from '@webilix/helper-library';

import { INgxHelperConfirm, INgxHelperConfirmConfig, INgxHelperConfirmResponse } from '../../types';

@Component({
    host: { selector: 'ngx-helper-confirm' },
    templateUrl: './ngx-helper-confirm.component.html',
    styleUrls: ['./ngx-helper-confirm.component.scss'],
})
export class NgxHelperConfirmComponent {
    @ViewChild('ngxHelperConfirmDescription') private readonly descriptionElementRef?: ElementRef;

    public info: INgxHelperConfirm = this.data.info;
    public item: string = this.data.item;
    public config: Partial<INgxHelperConfirmConfig> = this.data.config;

    public error: boolean = false;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        private readonly data: { info: INgxHelperConfirm; item: string; config: Partial<INgxHelperConfirmConfig> },
        private readonly bottomSheetRef: MatBottomSheetRef<NgxHelperConfirmComponent>,
    ) {}

    dismiss(confirmed: boolean = false): void {
        let value: string | null | undefined = undefined;

        if (confirmed && this.config.description && this.descriptionElementRef) {
            const element: HTMLTextAreaElement = this.descriptionElementRef.nativeElement;
            const description: string = element.value.trim();
            if (this.config.description === 'REQUIRED' && Helper.IS.empty(description)) {
                this.error = true;
                element.focus();
                return;
            }

            value = Helper.IS.empty(description) ? null : description;
        }

        const response: INgxHelperConfirmResponse = { confirmed, value };
        this.bottomSheetRef.dismiss(response);
    }
}
