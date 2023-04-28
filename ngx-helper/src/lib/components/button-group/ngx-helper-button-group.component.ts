import { Component, EventEmitter, Input, Output } from '@angular/core';

import { INgxHelperButtonGroup } from '../../interfaces';

@Component({
    selector: 'ngx-helper-button-group',
    templateUrl: './ngx-helper-button-group.component.html',
    styleUrls: ['./ngx-helper-button-group.component.scss'],
})
export class NgxHelperButtonGroupComponent {
    @Input() title: string = '';
    @Input() menu: INgxHelperButtonGroup[] = [];
    @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

    @Output() action: EventEmitter<string> = new EventEmitter<string>();
}
