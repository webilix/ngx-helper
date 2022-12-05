import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';

import { NgxUtilsMenu, NgxUtilsService } from '@ngx-utils';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { BoxComponent } from './box/box.component';
import { DialogComponent } from './dialog/dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private readonly ngxUtilsService: NgxUtilsService) {}

    public log = console.log;

    public boxComponent: ComponentType<BoxComponent> = BoxComponent;

    public menu: NgxUtilsMenu[] = [
        { title: 'عدم نمایش' },
        'SEPERATOR',
        'SEPERATOR',
        { title: 'مشاهده', route: ['/view'] },
        'SEPERATOR',
        { title: 'تنظیمات', icon: 'settings', color: 'accent', action: () => this.log('setting') },
        { title: 'ویرایش', icon: 'edit', action: () => this.log('edit') },
        { title: 'حذف', icon: 'delete', color: 'warn', action: () => this.log('delete') },
        'SEPERATOR',
        'SEPERATOR',
        { title: 'عدم نمایش' },
    ];

    public paginationCurrent: number = 1;
    public paginationTotal: number = 25;

    showButtomSheet(): void {
        this.ngxUtilsService
            .openBottomSheet<boolean>(BottomSheetComponent, 'نمایش BottomSheet', { date: new Date() })
            .then(
                (result) => this.log(result),
                () => {},
            );
    }

    showDialog(): void {
        this.ngxUtilsService.openDialog<boolean>(DialogComponent, 'نمایش Dialog', { date: new Date() }).then(
            (result) => this.log(result),
            () => {},
        );
    }

    confirm(type: 'ACTIVE' | 'ARCHIVE' | 'BLOCK' | 'DEACTIVE' | 'DELETE'): void {
        this.ngxUtilsService
            .confirm(
                type,
                'اطلاعات',
                'عنوان اطلاعات',
                'این پیام برای تست نحوه نمایش پیام‌های مربوط به تاییدیه، اضافه شده است.',
            )
            .then(
                () => this.log(true),
                () => {},
            );
    }
}
