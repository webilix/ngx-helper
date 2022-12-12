import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    templateUrl: './ngx-utils-toast.component.html',
    styleUrls: ['./ngx-utils-toast.component.scss'],
    animations: [
        trigger('host', [
            transition(':enter', [style({ opacity: 0 }), animate('350ms ease-in-out', style({ opacity: 1 }))]),
        ]),
    ],
})
export class NgxUtilsToastComponent implements OnInit, OnDestroy {
    @HostListener('click') private onClick = () => this.close();

    @HostBinding('@host') private host: boolean = true;
    @HostBinding('style.top') top: string = '1rem';
    @HostBinding('className') className: string = '';

    @Input() type: 'ERROR' | 'INFO' | 'SUCCESS' | 'WARNING' = 'SUCCESS';
    @Input() message: string[] = [];
    @Input() timeout: number = 5;

    public icon: string = 'done_all';

    public index: number = 0;
    public percent: number = 0;
    public start: number = 0;
    public interval?: any;

    constructor(public readonly elementRef: ElementRef) {}

    ngOnInit(): void {
        this.className = 'ngx-utils-toast ngx-utils-toast-' + this.type.toLowerCase();
        this.icon =
            this.type === 'ERROR'
                ? 'cancel'
                : this.type === 'INFO'
                ? 'warning_amber'
                : this.type === 'SUCCESS'
                ? 'done_all'
                : 'info';

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
