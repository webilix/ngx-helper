import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { NgxHelperBottomSheetService } from '@webilix/ngx-helper/bottom-sheet';

import { INgxHelperParamSelect } from '../../../interfaces';

@Component({
    host: { selector: 'ngx-helper-params-select' },
    templateUrl: './ngx-helper-params-select.component.html',
    styleUrls: ['./ngx-helper-params-select.component.scss'],
})
export class NgxHelperParamsSelectComponent {
    public param: INgxHelperParamSelect = this.data.param;
    public options: { id: string; title: string }[] = this.data.param.options;
    public value: string = this.data.value;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) private readonly data: { param: INgxHelperParamSelect; value: string },
        private readonly ngxHelperBottomSheetService: NgxHelperBottomSheetService,
    ) {}

    filter(query: string): void {
        this.options = !query
            ? this.data.param.options
            : this.data.param.options.filter((o) => o.title.toLowerCase().includes(query.toLocaleLowerCase()));
    }

    select(id: string): void {
        this.ngxHelperBottomSheetService.close(id);
    }
}
