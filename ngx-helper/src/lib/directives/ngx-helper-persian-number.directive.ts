import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[ngxHelperPersianNumber]' })
export class NgxHelperPersianNumberDirective {
    @Input() ngxHelperPersianNumber: boolean = true;

    @Input() isNnumber: boolean = false;
    @Input() isNegative: boolean = false;
    @Input() isDecimal: boolean = false;
    @Input() mask: string = '';
    @Input() showMaskTyped: boolean = false;

    private keyEn: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private keyFa: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    private input: HTMLInputElement;
    private hasMask: boolean = false;

    @HostListener('keypress', ['$event'])
    onKeyPress(event: KeyboardEvent): void {
        if (!this.ngxHelperPersianNumber) return;

        if (event.key === 'Enter') return this.onBlur();

        const decimal = ['Period', 'NumpadDecimal'].includes(event.code);
        if (this.isDecimal && decimal) return;

        const negative = ['Minus', 'NumpadSubtract'].includes(event.code);
        if (this.isNegative && negative) return;

        const check: string[] = [...this.keyEn, ...this.keyFa];
        if (!check.includes(event.key)) return event.preventDefault();
        if (!this.hasMask) return;

        const maxlength: number = Number(this.input.getAttribute('maxlength'));
        if (maxlength && (this.mask === 'separator.3' || this.mask === 'separator.0')) {
            const value: string = this.input.value.replace(/,/gi, '');
            const checkLength: string | null = value === '-' ? value : this.decimalPipe.transform(this.getEn(value));
            if (maxlength && (checkLength ? checkLength.length : 0) >= maxlength) return;
        }

        if (this.keyFa.includes(event.key)) {
            const start: number = this.input.selectionStart || 0;
            const end: number = this.input.selectionEnd || 0;
            const value: string = this.input.value.replace(/,/gi, '');

            this.input.value = value.slice(0, start) + this.getEn(event.key) + value.slice(end);
            this.input.selectionStart = this.input.selectionEnd = start + (this.showMaskTyped ? 1 : 0);
        }
    }

    @HostListener('input')
    onInput(): void {
        if (!this.ngxHelperPersianNumber || this.hasMask) return;
        const start: number = this.input.selectionStart || 0;
        const value: string = this.getEn(this.input.value);

        this.input.value = value;
        this.input.selectionStart = this.input.selectionEnd = start;
    }

    @HostListener('blur')
    onBlur(): void {
        if (!this.ngxHelperPersianNumber || !this.ngControl || !this.ngControl.control) return;

        if (this.isNnumber) {
            const check: string[] = [...this.keyEn, '.', '-'];
            const prefix: string | null = this.input.getAttribute('prefix');

            let value: string = this.getEn(this.input.value)
                .substring(prefix ? prefix.length : 0)
                .split('')
                .filter((v: string) => check.includes(v))
                .join('');
            if (value === '-') value = '';
            if (value.substring(value.length - 1) === '.') value = value.substring(0, value.length - 1);

            this.ngControl.control.setValue(value.length === 0 ? null : +value);
        } else {
            const check: string[] = [...this.keyEn, '.'];
            const prefix: string | null = this.input.getAttribute('prefix');
            const value: string = this.getEn(this.input.value)
                .substring(prefix ? prefix.length : 0)
                .split('')
                .filter((v: string) => check.includes(v))
                .join('');
            this.ngControl.control.setValue(value);
        }
    }

    constructor(
        @Optional() private readonly ngControl: NgControl,
        private readonly elementRef: ElementRef,
        private readonly decimalPipe: DecimalPipe,
    ) {
        this.input = this.elementRef.nativeElement as HTMLInputElement;
    }

    ngOnInit(): void {
        this.hasMask = !!this.mask;
    }

    getEn(value: string): string {
        this.keyFa.forEach((key: string, index: number) => {
            const regex: RegExp = new RegExp(key, 'gi');
            value = value.replace(regex, this.keyEn[index]);
        });

        return value;
    }
}
