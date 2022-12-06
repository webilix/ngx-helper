import { ComponentType } from '@angular/cdk/portal';
import { Component, Pipe } from '@angular/core';

import { NgxUtilsMenu, NgxUtilsService } from '@ngx-utils';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { BoxComponent } from './box/box.component';
import { DialogComponent } from './dialog/dialog.component';
import { ListComponent } from './list/list.component';
import { PipeComponent } from './pipe/pipe.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private readonly ngxUtilsService: NgxUtilsService) {}

    public log = console.log;

    public boxComponent: ComponentType<BoxComponent> = BoxComponent;
    public listComponent: ComponentType<ListComponent> = ListComponent;
    public pipeComponent: ComponentType<PipeComponent> = PipeComponent;

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

    showPreview(description: boolean): void {
        this.ngxUtilsService.showPreview(
            'https://angular.io/assets/images/logos/angular/logo-nav@2x.png',
            description
                ? 'شیوه نمایش توضیحات مربوط به تصویر در هنگام استفاده از کامپوننت پیش‌نمایش تصویر' +
                      '\n' +
                      'نمایش در چند خط با کدهای <strong style="color: red;">HTML</strong>'
                : undefined,
        );
    }

    showGallery(index?: number): void {
        const images: (string | { image: string; description?: string })[] = [
            'https://angular.io/assets/images/logos/angular/logo-nav@2x.png',
            { image: 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png' },
            {
                image: 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png',
                description:
                    'شیوه نمایش توضیحات مربوط به تصویر در هنگام استفاده از کامپوننت پیش‌نمایش تصویر' +
                    '\n' +
                    'نمایش در چند خط با کدهای <strong style="color: red;">HTML</strong>',
            },
        ];

        this.ngxUtilsService.showGallery(images, index);
    }

    showMap(type: number): void {
        type === 1
            ? this.ngxUtilsService.showMap(35.715298, 51.404343)
            : type === 2
            ? this.ngxUtilsService.showMap({ lat: 35.715298, long: 51.404343 })
            : type === 3
            ? this.ngxUtilsService.showMap({ latitude: 35.715298, longitude: 51.404343 })
            : this.ngxUtilsService.showMap(35.715298, 51.404343, 11);
    }

    confirm(type?: 'ACTIVE' | 'ARCHIVE' | 'BLOCK' | 'DEACTIVE' | 'DELETE'): void {
        const item: string = 'اطلاعات';
        const title: string = 'عنوان اطلاعات';
        const message: string = 'این پیام برای تست نحوه نمایش پیام‌های مربوط به تاییدیه، اضافه شده است.';

        (type
            ? this.ngxUtilsService.confirm(type, item, title, message)
            : this.ngxUtilsService.confirm({ title: 'سفارشی', icon: 'tune', color: 'accent' }, item, title, message)
        ).then(
            () => this.log(true),
            () => {},
        );
    }
}
