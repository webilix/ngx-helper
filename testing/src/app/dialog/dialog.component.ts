import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxUtilsService } from '@ngx-utils';

@Component({
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: any,
        private readonly ngxUtilsService: NgxUtilsService,
    ) {}

    close(result: boolean = false): void {
        this.ngxUtilsService.closeDialog(result);
    }
}
