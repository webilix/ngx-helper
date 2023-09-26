import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { INgxHelperToastConfig } from './ngx-helper-toast.interface';

@Component({
    host: { selector: 'ngx-helper-toast' },
    templateUrl: './ngx-helper-toast.component.html',
    styleUrls: ['./ngx-helper-toast.component.scss'],
    animations: [
        trigger('host', [
            transition(':enter', [style({ opacity: 0 }), animate('350ms ease-in-out', style({ opacity: 1 }))]),
        ]),
    ],
})
export class NgxHelperToastComponent implements OnInit, OnDestroy {
    @HostListener('click') private onClick = () => this.close();

    @HostBinding('@host') private host: boolean = true;
    @HostBinding('style.top') top: string = '1rem';
    @HostBinding('className') className: string = '';
    @HostBinding('style.backgroundColor') backgroundColor: string = '';

    @Input({ required: true }) config?: INgxHelperToastConfig;
    @Input({ required: true }) message: string[] = [];
    @Input({ required: true }) timeout: number = 5;

    public index: number = 0;
    public percent: number = 0;
    public start: number = 0;
    public interval?: any;

    constructor(public readonly elementRef: ElementRef) {}

    ngOnInit(): void {
        if (!this.config) return;
        this.className = 'ngx-helper-toast';
        this.backgroundColor = this.config.backColor;

        if (this.timeout === 0) return;
        this.start = new Date().getTime();
        this.interval = setInterval(() => {
            const timer: number = new Date().getTime();
            this.percent = ((timer - this.start) * 100) / (this.timeout * 1000);
            this.percent = this.percent < 100 ? this.percent : 100;
            if (this.percent === 100) this.close();
        }, 25);
    }

    ngOnDestroy(): void {
        if (this.interval) clearInterval(this.interval);
    }

    close(): void {}
}
