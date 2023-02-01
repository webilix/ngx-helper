import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Component({
    selector: 'ngx-utils-plate',
    templateUrl: './ngx-utils-plate.component.html',
    styleUrls: ['./ngx-utils-plate.component.scss'],
})
export class NgxUtilsPlateComponent implements OnChanges {
    @Input() plate: string[] = [];

    public show: boolean = false;

    ngOnChanges(changes: SimpleChanges): void {
        this.show = Helper.IS.plate(this.plate);
    }
}
