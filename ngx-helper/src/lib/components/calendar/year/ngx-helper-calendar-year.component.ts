import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { JalaliDateTime } from '@webilix/jalali-date-time';
import { Helper } from '@webilix/helper-library';

import { INgxHelperCalendarConfig } from '../../../interfaces/ngx-helper-calendar';

@Component({
    templateUrl: './ngx-helper-calendar-year.component.html',
    styleUrls: ['./ngx-helper-calendar-year.component.scss'],
})
export class NgxHelperCalendarYearComponent implements OnInit {
    private jalali = JalaliDateTime({ timezone: this.timezone });

    public title: string = this.data.title || 'انتخاب سال';
    public today: string = '';
    public minDate: string = '';
    public maxDate: string = '';

    public current: string = '';

    public years: number[] = [];

    constructor(
        @Inject('NGX_HELPER_TIMEZONE') public readonly timezone: string,
        @Inject(MAT_DIALOG_DATA) private readonly data: INgxHelperCalendarConfig,
        private readonly dialogRef: MatDialogRef<NgxHelperCalendarYearComponent>,
    ) {}

    ngOnInit(): void {
        this.today = this.jalali.toString(new Date(), { format: 'Y' });
        this.minDate = this.data.minDate ? this.jalali.toString(this.data.minDate, { format: 'Y' }) : '1000';
        this.maxDate = this.data.maxDate ? this.jalali.toString(this.data.maxDate, { format: 'Y' }) : '9999';

        const value: Date | null =
            this.data.value === undefined ? null : Helper.IS.date(this.data.value) ? this.data.value : null;

        this.current = value ? this.jalali.toString(value, { format: 'Y' }) : '';
        this.changeYear(+(this.current ? this.current.substring(0, 4) : this.today.substring(0, 4)));
    }

    changeYear(year: number): void {
        if (year < 1000) year = 1000;

        const count: number = 25;
        const start: number = year - (year % count);
        this.years = [...Array(count).keys()].map((n: number) => start + n);
    }

    setYear(year: string): void {
        if ((this.minDate && year < this.minDate) || (this.maxDate && year > this.maxDate)) return;

        const lastDayInYear: string = this.jalali.daysInMonth(`${year}-12`).toString();
        const from: Date = new Date(this.jalali.gregorian(`${year}-01-01`).date);
        const to: Date = new Date(this.jalali.gregorian(`${year}-12-${lastDayInYear}`).date);
        this.dialogRef.close({ from: this.jalali.periodDay(1, from).from, to: this.jalali.periodDay(1, to).to });
    }
}
