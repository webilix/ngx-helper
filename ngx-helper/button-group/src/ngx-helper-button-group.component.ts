import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { INgxHelperButtonGroup } from './ngx-helper-button-group.interface';

@Component({
    selector: 'ngx-helper-button-group',
    templateUrl: './ngx-helper-button-group.component.html',
    styleUrls: ['./ngx-helper-button-group.component.scss'],
})
export class NgxHelperButtonGroupComponent implements OnChanges {
    @HostBinding('className') className: string = '';

    @Input({ required: true }) title!: string;
    @Input({ required: true }) menu!: INgxHelperButtonGroup[];
    @Input({ required: false }) color: 'primary' | 'accent' | 'warn' = 'primary';

    @Output() action: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(changes: SimpleChanges): void {
        this.className = !this.title || this.menu.length === 0 ? 'ngx-helper-hidden' : '';
    }
}
