import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { INgxHelperDialogConfig } from '../../interfaces';

@Component({
    templateUrl: './ngx-helper-dialog.component.html',
    styleUrls: ['./ngx-helper-dialog.component.scss'],
})
export class NgxHelperDialogComponent {
    public component: ComponentType<any> = this.data.component;
    public title: string = this.data.title;
    public disableClose: boolean = !!this.data.config.disableClose;
    public injector: Injector = Injector.create({
        providers: [{ provide: MAT_DIALOG_DATA, useValue: this.data.config.data }],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: {
            title: string;
            component: ComponentType<any>;
            config: Partial<INgxHelperDialogConfig>;
        },
    ) {}
}
