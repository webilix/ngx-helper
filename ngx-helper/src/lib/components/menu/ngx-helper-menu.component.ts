import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatMenuTrigger, MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { Router } from '@angular/router';

import { NgxHelperMenu } from '../../types/ngx-helper-menu';

@Component({
    selector: 'ngx-helper-menu',
    templateUrl: './ngx-helper-menu.component.html',
    styleUrls: ['./ngx-helper-menu.component.scss'],
})
export class NgxHelperMenuComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild(MatMenuTrigger) matMenuTrigger?: MatMenuTrigger;

    @Input() title?: string;
    @Input() icon?: string;
    @Input() color?: 'primary' | 'accent' | 'warn';
    @Input() tigger?: Element;
    @Input() border: number = 0;
    @Input() xPosition: MenuPositionX = 'after';
    @Input() yPosition: MenuPositionY = 'below';
    @Input() menu: NgxHelperMenu[] = [];
    @Output() menuChange: EventEmitter<NgxHelperMenu[]> = new EventEmitter<NgxHelperMenu[]>();

    private clickListener = () => this.matMenuTrigger?.openMenu();

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        if (this.tigger?.addEventListener) this.tigger?.addEventListener('click', this.clickListener);
    }

    ngOnDestroy(): void {
        if (this.tigger?.removeEventListener) this.tigger?.removeEventListener('click', this.clickListener);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.menu.length === 0) return;

        if (!this.icon && !this.title) this.icon = 'more_vert';
        if (!this.color) this.color = 'primary';

        this.menu = [...this.menu].filter(
            (menu: NgxHelperMenu) => menu === 'SEPERATOR' || !menu.hideOn || !menu.hideOn(),
        );

        while (this.menu.length !== 0 && this.menu[0] === 'SEPERATOR') this.menu = this.menu.slice(1);
        while (this.menu.length !== 0 && this.menu[this.menu.length - 1] === 'SEPERATOR')
            this.menu = this.menu.slice(0, this.menu.length - 1);

        this.menuChange.emit(this.menu);
    }

    click(click: string[] | (() => void)): void {
        Array.isArray(click) ? this.router.navigate(click) : click();
    }
}
