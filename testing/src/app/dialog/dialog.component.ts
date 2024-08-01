import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxHelperDialogService } from '@webilix/ngx-helper';

@Component({
    host: { selector: 'dialog' },
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: any,
        private readonly ngxHelperDialogService: NgxHelperDialogService,
    ) {}

    close(result: boolean = false): void {
        this.ngxHelperDialogService.close(result);
    }
}
