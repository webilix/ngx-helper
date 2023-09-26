import { Component, EventEmitter, Input, Output } from '@angular/core';

import { INgxHelperButtonGroup } from './ngx-helper-button-group.interface';

@Component({
    selector: 'ngx-helper-button-group',
    templateUrl: './ngx-helper-button-group.component.html',
    styleUrls: ['./ngx-helper-button-group.component.scss'],
})
export class NgxHelperButtonGroupComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) menu!: INgxHelperButtonGroup[];
    @Input({ required: false }) color: 'primary' | 'accent' | 'warn' = 'primary';

    @Output() action: EventEmitter<string> = new EventEmitter<string>();
}
