import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, Injector } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { INgxHelperBottomSheetConfig } from '../../interfaces';

@Component({
    host: { selector: 'ngx-helper-bottom-sheet' },
    templateUrl: './ngx-helper-bottom-sheet.component.html',
    styleUrls: ['./ngx-helper-bottom-sheet.component.scss'],
})
export class NgxHelperBottomSheetComponent {
    public component: ComponentType<any> = this.data.component;
    public title: string = this.data.title;
    public disableClose: boolean = !!this.data.config.disableClose;
    public padding: string = this.data.config.padding || '1rem';

    public injector: Injector = Injector.create({
        providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: this.data.config.data }],
    });

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        private readonly data: {
            title: string;
            component: ComponentType<any>;
            config: Partial<INgxHelperBottomSheetConfig>;
        },
        private readonly bottomSheetRef: MatBottomSheetRef<NgxHelperBottomSheetComponent>,
    ) {}

    dismiss(result?: any): void {
        this.bottomSheetRef.dismiss(result);
    }
}
