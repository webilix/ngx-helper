import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Helper } from '@webilix/helper-library';

@Component({
    selector: 'ngx-helper-plate',
    templateUrl: './ngx-helper-plate.component.html',
    styleUrls: ['./ngx-helper-plate.component.scss'],
})
export class NgxHelperPlateComponent implements OnChanges {
    @HostBinding('className') className: string = '';

    @Input({ required: true }) plate!: string[];
    @Input({ required: false }) border: boolean = true;

    public show: boolean = false;

    ngOnChanges(changes: SimpleChanges): void {
        this.show = Helper.IS.plate(this.plate);
        this.className = !this.show ? 'ngx-helper-hidden' : '';
    }
}
