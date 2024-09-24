import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Helper } from '@webilix/helper-library';

import { NgxHelperMenu } from '@webilix/ngx-helper/menu';

import { NgxHelperListMenu } from './ngx-helper-list.type';

@Component({
    selector: 'ngx-helper-list',
    templateUrl: './ngx-helper-list.component.html',
    styleUrls: ['./ngx-helper-list.component.scss'],
})
export class NgxHelperListComponent<D> implements OnChanges {
    @HostBinding('className') className: string = '';

    @Input({ required: true }) data!: D;
    @Input({ required: true }) id!: string;
    @Input({ required: false }) menu: NgxHelperListMenu<D>[] = [];
    @Input({ required: false }) deactive: boolean = false;

    public ngxMenu: NgxHelperMenu[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        this.className = !this.id || !this.data ? 'ngx-helper-hidden' : '';

        this.ngxMenu = this.menu
            .filter(
                (menu: NgxHelperListMenu<D>) =>
                    menu === 'DIVIDER' || !this.data || !menu.hideOn || !menu.hideOn(this.data),
            )
            .map((menu: NgxHelperListMenu<D>) => {
                if (menu === 'DIVIDER') return 'DIVIDER';

                return {
                    title: menu.title,
                    click: this.click(menu.click),
                    icon: menu.icon,
                    color: menu.color,
                    disableOn: () => (menu.disableOn && this.data ? menu.disableOn(this.data) : false),
                };
            });

        while (this.ngxMenu.length !== 0 && this.ngxMenu[0] === 'DIVIDER') this.ngxMenu = this.ngxMenu.slice(1);
        while (this.ngxMenu.length !== 0 && this.ngxMenu[this.ngxMenu.length - 1] === 'DIVIDER')
            this.ngxMenu = this.ngxMenu.slice(0, this.ngxMenu.length - 1);
    }

    click(click: string[] | ((id: string) => void)): string[] | (() => void) {
        return Array.isArray(click) ? this.route(click) : () => click(this.id);
    }

    route(route: string[]): string[] {
        if (!Helper.IS.array(route) || route.length === 0) return [];

        const id: string = this.id;
        return route.map((r: string) => (r === ':ID' ? id : r));
    }
}
