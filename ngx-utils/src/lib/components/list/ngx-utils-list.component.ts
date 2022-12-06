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
        this.ngxMenu = this.menu
            .filter(
                (menu: NgxUtilsListMenu<D>) =>
                    menu === 'SEPERATOR' || !menu.hideOn || !this.data || !menu.hideOn(this.data),
            )
            .map((menu: NgxUtilsListMenu<D>) => {
                if (menu === 'SEPERATOR' || !this.id) return 'SEPERATOR';
                return {
                    title: menu.title,
                    icon: menu.icon,
                    color: menu.color,
                    route: this.route(menu.route),
                    action: menu.action ? () => this.action(menu.action) : undefined,
                };
            });
    }

    action(callback?: (id: string) => void): void {
        if (this.id && callback) callback(this.id);
    }

    route(route?: string[]): string[] | undefined {
        if (!route || !Validator.VALUE.isArray(route) || route.length === 0 || !this.id) return undefined;

        const id: string = this.id;
        return route.map((r: string) => (r === ':ID' ? id : r));
    }
}
