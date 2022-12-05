import { Component } from '@angular/core';

import { NgxUtilsService } from '@ngx-utils';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { DialogComponent } from './dialog/dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private readonly ngxUtilsService: NgxUtilsService) {}

    public log = console.log;

    public paginationCurrent: number = 1;
    public paginationTotal: number = 25;

    showButtomSheet(): void {
        this.ngxUtilsService
            .openBottomSheet<boolean>(BottomSheetComponent, 'نمایش BottomSheet', { date: new Date() })
            .then(
                (result) => console.log(result),
                () => {},
            );
    }

    showDialog(): void {
        this.ngxUtilsService.openDialog<boolean>(DialogComponent, 'نمایش Dialog', { date: new Date() }).then(
            (result) => console.log(result),
            () => {},
        );
    }

    confirm(type: 'ACTIVE' | 'BLOCK' | 'DEACTIVE' | 'DELETE'): void {
        this.ngxUtilsService
            .confirm(
                type,
                'اطلاعات',
                'عنوان اطلاعات',
                'این پیام برای تست نحوه نمایش پیام‌های مربوط به تاییدیه، اضافه شده است.',
            )
            .then(
                () => console.log(true),
                () => {},
            );
    }
}
