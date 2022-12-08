import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Validator } from '@webilix/validator-library';

import { NgxUtilsListMenu } from '../../types/ngx-list';
import { NgxUtilsMenu } from '../../types/ngx-menu';

@Component({
    selector: 'ngx-utils-list',
    templateUrl: './ngx-utils-list.component.html',
    styleUrls: ['./ngx-utils-list.component.scss'],
})
export class NgxUtilsListComponent<D> implements OnChanges {
    @Input() id?: string;
    @Input() data?: D;
    @Input() menu: NgxUtilsListMenu<D>[] = [];
    @Input() deactive: boolean = false;

    public ngxMenu: NgxUtilsMenu[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        this.ngxMenu = this.menu.map((menu: NgxUtilsListMenu<D>) => {
            if (menu === 'SEPERATOR' || !this.id) return 'SEPERATOR';
            return {
                title: menu.title,
                click: this.click(menu.click),
                icon: menu.icon,
                color: menu.color,
                hideOn: () => (!menu.hideOn || !this.data ? false : menu.hideOn(this.data)),
            };
        });
    }

    click(click: string[] | ((id: string) => void)): string[] | (() => void) {
        return Array.isArray(click) ? this.route(click) : () => this.id && click(this.id);
    }

    route(route: string[]): string[] {
        if (!Validator.VALUE.isArray(route) || route.length === 0 || !this.id) return [];

        const id: string = this.id;
        return route.map((r: string) => (r === ':ID' ? id : r));
    }
}
