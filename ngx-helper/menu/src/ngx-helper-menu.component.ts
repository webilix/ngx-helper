import {
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatMenuTrigger, MenuCloseReason, MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { Router } from '@angular/router';

import { NgxHelperMenu } from './ngx-helper-menu.type';

@Component({
    selector: 'ngx-helper-menu',
    templateUrl: './ngx-helper-menu.component.html',
    styleUrls: ['./ngx-helper-menu.component.scss'],
})
export class NgxHelperMenuComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild(MatMenuTrigger) matMenuTrigger?: MatMenuTrigger;

    @HostBinding('className') className: string = '';

    @Input({ required: true }) menu!: NgxHelperMenu[];

    @Input({ required: false }) title?: string;
    @Input({ required: false }) icon?: string;
    @Input({ required: false }) color?: 'primary' | 'accent' | 'warn';
    @Input({ required: false }) tigger?: Element;
    @Input({ required: false }) border: number = 0;
    @Input({ required: false }) xPosition: MenuPositionX = 'after';
    @Input({ required: false }) yPosition: MenuPositionY = 'below';

    @Output() menuOpened: EventEmitter<void> = new EventEmitter<void>();
    @Output() menuClosed: EventEmitter<void> = new EventEmitter<void>();
    @Output() menuChanged: EventEmitter<NgxHelperMenu[]> = new EventEmitter<NgxHelperMenu[]>();

    private clickListener = () => this.matMenuTrigger?.openMenu();

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        if (this.tigger?.addEventListener) this.tigger?.addEventListener('click', this.clickListener);
    }

    ngOnDestroy(): void {
        if (this.tigger?.removeEventListener) this.tigger?.removeEventListener('click', this.clickListener);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.className = 'ngx-helper-hidden';
        if (this.menu.length === 0) return;

        if (!this.icon && !this.title) this.icon = 'more_vert';
        if (!this.color) this.color = 'primary';

        this.menu = [...this.menu].filter(
            (menu: NgxHelperMenu) => menu === 'SEPERATOR' || !menu.hideOn || !menu.hideOn(),
        );

        while (this.menu.length !== 0 && this.menu[0] === 'SEPERATOR') this.menu = this.menu.slice(1);
        while (this.menu.length !== 0 && this.menu[this.menu.length - 1] === 'SEPERATOR')
            this.menu = this.menu.slice(0, this.menu.length - 1);

        this.className =
            this.menu.length === 0 || (this.menu.length === 1 && this.menu[0] === 'SEPERATOR')
                ? 'ngx-helper-hidden'
                : '';
        this.menuChanged.emit(this.menu);
    }

    click(click: string[] | (() => void)): void {
        Array.isArray(click) ? this.router.navigate(click) : click();
    }
}
