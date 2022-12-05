import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ngx-utils-dialog.component.html',
    styleUrls: ['./ngx-utils-dialog.component.scss'],
})
export class NgxUtilsDialogComponent {
    public component: ComponentType<any> = this.data.component;
    public title: string = this.data.title;
    public injector: Injector = Injector.create({
        providers: [{ provide: MAT_DIALOG_DATA, useValue: this.data.data }],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: { component: ComponentType<any>; title: string; data?: any },
    ) {}
}
