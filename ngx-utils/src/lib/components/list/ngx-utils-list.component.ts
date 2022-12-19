import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Validator } from '@webilix/validator-library';

import { NgxUtilsListMenu } from '../../types/ngx-utils-list';
import { NgxUtilsMenu } from '../../types/ngx-utils-menu';

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
            if (menu.hideOn && this.data && menu.hideOn(this.data)) return 'SEPERATOR';

            return {
                title: menu.title,
                click: this.click(menu.click),
                icon: menu.icon,
                color: menu.color,
                disableOn: () => (menu.disableOn && this.data ? menu.disableOn(this.data) : false),
            };
        });

        while (this.ngxMenu.length !== 0 && this.ngxMenu[0] === 'SEPERATOR') this.ngxMenu = this.ngxMenu.slice(1);
        while (this.ngxMenu.length !== 0 && this.ngxMenu[this.ngxMenu.length - 1] === 'SEPERATOR')
            this.ngxMenu = this.ngxMenu.slice(0, this.ngxMenu.length - 1);
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
