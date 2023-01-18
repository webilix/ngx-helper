import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, Injector } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
    templateUrl: './ngx-utils-bottom-sheet.component.html',
    styleUrls: ['./ngx-utils-bottom-sheet.component.scss'],
})
export class NgxUtilsBottomSheetComponent {
    public component: ComponentType<any> = this.data.component;
    public title: string = this.data.title;
    public disableClose: boolean = !!this.data.disableClose;
    public injector: Injector = Injector.create({
        providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: this.data.data }],
    });

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        private readonly data: { component: ComponentType<any>; title: string; data?: any; disableClose?: boolean },
        private readonly bottomSheetRef: MatBottomSheetRef<NgxUtilsBottomSheetComponent>,
    ) {}

    dismiss(result?: any): void {
        this.bottomSheetRef.dismiss(result);
    }
}
