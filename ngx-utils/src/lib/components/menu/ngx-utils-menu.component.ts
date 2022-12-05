import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NgxUtilsMenu } from '../../types/ngx-menu';

@Component({
    selector: 'ngx-utils-menu',
    templateUrl: './ngx-utils-menu.component.html',
    styleUrls: ['./ngx-utils-menu.component.scss'],
})
export class NgxUtilsMenuComponent implements OnChanges {
    @Input() title?: string;
    @Input() icon?: string;
    @Input() color?: 'primary' | 'accent' | 'warn';
    @Input() menu: NgxUtilsMenu[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (this.menu.length === 0) return;

        if (!this.icon && !this.title) this.icon = 'more_vert';
        if (!this.color) this.color = 'primary';

        this.menu = [...this.menu].filter((menu: NgxUtilsMenu) => menu === 'SEPERATOR' || menu.route || menu.action);
        while (this.menu.length !== 0 && this.menu[0] === 'SEPERATOR') this.menu = this.menu.slice(1);
        while (this.menu.length !== 0 && this.menu[this.menu.length - 1] === 'SEPERATOR')
            this.menu = this.menu.slice(0, this.menu.length - 1);
    }
}
