import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Helper } from '@webilix/helper-library';

import { INgxHelperValue } from './ngx-helper-value.interface';
import { NgxHelperValuePipe } from './ngx-helper-value.pipe';

@Component({
    selector: 'ngx-helper-value',
    templateUrl: './ngx-helper-value.component.html',
    styleUrls: ['./ngx-helper-value.component.scss'],
    animations: [
        trigger('copy', [
            state('show', style({ opacity: 1 })),
            state('hide', style({ opacity: 0 })),
            transition('show <=> hide', animate('150ms ease-in')),
        ]),
    ],
})
export class NgxHelperValueComponent implements OnChanges {
    @HostBinding('className') className: string = '';

    @Input({ required: true }) values: INgxHelperValue[] = [];
    @Input({ required: false }) width: number = 100;
    @Input({ required: false }) border: boolean = true;

    public copy: string[] = [];
    public copyIndex: number | null = null;
    public copyTimeout: any;

    constructor(private readonly ngxHelperValuePipe: NgxHelperValuePipe) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.className = this.values.length === 0 ? 'ngx-helper-hidden' : '';

        this.copy = Array(this.values.length).fill('');
        this.values.forEach((value: INgxHelperValue, index: number) => {
            if (typeof value.value === 'string') this.copy[index] = value.value;
            else
                switch (value.value.type) {
                    case 'BANK-CARD':
                    case 'ENGLISH':
                    case 'MOBILE':
                    case 'MULTILINE':
                        this.copy[index] = value.value.value;
                        break;

                    case 'DATE':
                        this.copy[index] = this.ngxHelperValuePipe.getDate(
                            value.value.value,
                            value.value.format,
                            value.value.timezone,
                        );
                        break;
                    case 'DURATION':
                        this.copy[index] = this.ngxHelperValuePipe.getDuration(value.value.value, value.value.format);
                        break;
                    case 'NUMBER':
                        this.copy[index] = value.value.value.toString();
                        break;
                    case 'PERIOD':
                        this.copy[index] = this.ngxHelperValuePipe.getPeriod(value.value.value, value.value.timezone);
                        break;
                    case 'PRICE':
                        const priceEN: boolean = !!value.value.english;
                        this.copy[index] = this.ngxHelperValuePipe
                            .getPrice(value.value.value, priceEN, !!value.value.short)
                            .map((v) => (typeof v === 'string' ? v : Helper.NUMBER.format(v, priceEN ? 'EN' : 'FA')))
                            .join(' ');
                        if (value.value.currency) this.copy[index] += ` ${value.value.currency}`;
                        break;
                    case 'WEIGHT':
                        const weightEN: boolean = !!value.value.english;
                        this.copy[index] = this.ngxHelperValuePipe
                            .getWeight(value.value.value, weightEN, !!value.value.short)
                            .map((v) => (typeof v === 'string' ? v : Helper.NUMBER.format(v, weightEN ? 'EN' : 'FA')))
                            .join(' ');
                        break;
                }
        });
    }

    setCopy(index: number): void {
        if (this.copyIndex === index) return;
        if (this.copyTimeout) clearTimeout(this.copyTimeout);

        this.copyIndex = index;
        this.copyTimeout = setTimeout(() => (this.copyIndex = null), 2500);
    }
}
