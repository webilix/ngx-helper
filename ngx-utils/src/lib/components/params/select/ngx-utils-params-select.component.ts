import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { INgxUtilsParamSelect } from '../../../interfaces/ngx-utils-params';
import { NgxUtilsService } from '../../../ngx-utils.service';

@Component({
    templateUrl: './ngx-utils-params-select.component.html',
    styleUrls: ['./ngx-utils-params-select.component.scss'],
})
export class NgxUtilsParamsSelectComponent {
    public param: INgxUtilsParamSelect = this.data.param;
    public options: { id: string; title: string }[] = this.data.param.options;
    public value: string = this.data.value;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) private readonly data: { param: INgxUtilsParamSelect; value: string },
        private readonly ngxUtilsService: NgxUtilsService,
    ) {}

    filter(query: string): void {
        this.options = !query
            ? this.data.param.options
            : this.data.param.options.filter((o) => o.title.toLowerCase().includes(query.toLocaleLowerCase()));
    }

    select(id: string): void {
        this.ngxUtilsService.closeBottomSheet(id);
    }
}
