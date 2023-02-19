import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Helper } from '@webilix/helper-library';

import { NgxHelperListMenu } from '../../types/ngx-helper-list';
import { NgxHelperMenu } from '../../types/ngx-helper-menu';

@Component({
    selector: 'ngx-helper-list',
    templateUrl: './ngx-helper-list.component.html',
    styleUrls: ['./ngx-helper-list.component.scss'],
})
export class NgxHelperListComponent<D> implements OnChanges {
    @Input() id?: string;
    @Input() data?: D;
    @Input() menu: NgxHelperListMenu<D>[] = [];
    @Input() deactive: boolean = false;

    public ngxMenu: NgxHelperMenu[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        this.ngxMenu = this.menu
            .filter(
                (menu: NgxHelperListMenu<D>) =>
                    menu === 'SEPERATOR' || !this.data || !menu.hideOn || !menu.hideOn(this.data),
            )
            .map((menu: NgxHelperListMenu<D>) => {
                if (menu === 'SEPERATOR' || !this.id) return 'SEPERATOR';

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
        if (!Helper.IS.array(route) || route.length === 0 || !this.id) return [];

        const id: string = this.id;
        return route.map((r: string) => (r === ':ID' ? id : r));
    }
}
