import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NgxUtilsValuePipe } from '../../pipes/ngx-utils-value.pipe';
import { INgxUtilsValues } from '../../types/ngx-utils-value';

@Component({
    selector: 'ngx-utils-values',
    templateUrl: './ngx-utils-values.component.html',
    styleUrls: ['./ngx-utils-values.component.scss'],
    animations: [
        trigger('copy', [
            state('show', style({ opacity: 1 })),
            state('hide', style({ opacity: 0 })),
            transition('show <=> hide', animate('150ms ease-in')),
        ]),
    ],
})
export class NgxUtilsValuesComponent implements OnChanges {
    @Input() values: INgxUtilsValues[] = [];
    @Input() width: number = 100;
    @Input() border: boolean = true;

    public copy: string[] = [];
    public copyIndex: number | null = null;
    public copyTimeout: any;

    constructor(private readonly ngxUtilsValuePipe: NgxUtilsValuePipe) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.copy = Array(this.values.length).fill('');
        this.values.forEach((value: INgxUtilsValues, index: number) => {
            if (typeof value.value === 'string') this.copy[index] = value.value;
            else
                switch (value.value.type) {
                    case 'BANK-CARD':
                    case 'EN':
                    case 'MOBILE':
                    case 'MULTILINE':
                        this.copy[index] = value.value.value;
                        break;

                    case 'DATE':
                        this.copy[index] = this.ngxUtilsValuePipe.getDate(
                            value.value.value,
                            value.value.format,
                            value.value.timezone,
                        );
                        break;
                    case 'DURATION':
                        this.copy[index] = this.ngxUtilsValuePipe.getDuration(value.value.value, value.value.view);
                        break;
                    case 'NUMBER':
                        this.copy[index] = value.value.value.toString();
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
