import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { INgxHelperTag } from './ngx-helper-tag.interface';

@Component({
    selector: 'ngx-helper-tag',
    templateUrl: './ngx-helper-tag.component.html',
    styleUrls: ['./ngx-helper-tag.component.scss'],
})
export class NgxHelperTagComponent implements OnChanges {
    @HostBinding('className') className: string = '';

    @Input({ required: true }) tags!: INgxHelperTag[];

    constructor(private readonly router: Router) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.className = this.tags.length === 0 ? 'ngx-helper-hidden' : '';
    }

    click(click?: string[] | (() => void)): void {
        if (!click) return;
        Array.isArray(click) ? this.router.navigate(click) : click();
    }
}
