import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Validator } from '@webilix/validator-library';

@Component({
    selector: 'ngx-utils-plate',
    templateUrl: './ngx-utils-plate.component.html',
    styleUrls: ['./ngx-utils-plate.component.scss'],
})
export class NgxUtilsPlateComponent implements OnChanges {
    @Input() plate: string[] = [];

    public show: boolean = false;

    ngOnChanges(changes: SimpleChanges): void {
        this.show = false;
        if (this.plate.length !== 4) return;
        if (!Validator.STRING.isNumeric(this.plate[0]) || this.plate[0].length !== 2) return;
        if (!Validator.VALUE.isString(this.plate[1]) || this.plate[1].length !== 1) return;
        if (!Validator.STRING.isNumeric(this.plate[2]) || this.plate[2].length !== 3) return;
        if (!Validator.STRING.isNumeric(this.plate[3]) || this.plate[3].length !== 2) return;

        this.show = true;
    }
}
