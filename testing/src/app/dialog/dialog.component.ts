import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxHelperService } from '@ngx-helper';

@Component({
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: any,
        private readonly ngxHelperService: NgxHelperService,
    ) {}

    close(result: boolean = false): void {
        this.ngxHelperService.closeDialog(result);
    }
}
