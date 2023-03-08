import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { JalaliDateTime, JalaliDateTimeCalendar, JalaliDateTimePeriod } from '@webilix/jalali-date-time';
import { Helper } from '@webilix/helper-library';

import { INgxHelperCalendarConfig } from '../../../interfaces';

@Component({
    templateUrl: './ngx-helper-calendar-week.component.html',
    styleUrls: ['./ngx-helper-calendar-week.component.scss'],
})
export class NgxHelperCalendarWeekComponent implements OnInit {
    private jalali = JalaliDateTime({ timezone: this.timezone });

    public title: string = this.data.title || 'انتخاب هفته';
    public today: string = '';
    public minDate: string = '';
    public maxDate: string = '';

    public current: string = '';
    public month: string = '';
    public calendar: JalaliDateTimeCalendar = this.jalali.calendar();

    public showMonth: boolean = false;
    public seasons: string[][] = [
        ['فروردین', 'اردیبهشت', 'خرداد'],
        ['تیر', 'مرداد', 'شهریور'],
        ['مهر', 'آبان', 'آذر'],
        ['دی', 'بهمن', 'اسفند'],
    ];

    constructor(
        @Inject('NGX_HELPER_TIMEZONE') public readonly timezone: string,
        @Inject(MAT_DIALOG_DATA) private readonly data: INgxHelperCalendarConfig,
        private readonly dialogRef: MatDialogRef<NgxHelperCalendarWeekComponent>,
    ) {}

    ngOnInit(): void {
        this.today = this.jalali.toString(new Date(), { format: 'Y-M-D' });
        this.minDate = '0000-00-00';
        if (this.data.minDate) {
            const period: JalaliDateTimePeriod = this.jalali.periodWeek(1, this.data.minDate);
            this.minDate = this.jalali.toString(period.from, { format: 'Y-M-D' });
        }
        this.maxDate = '9999-99-99';
        if (this.data.maxDate) {
            const period: JalaliDateTimePeriod = this.jalali.periodWeek(1, this.data.maxDate);
            this.maxDate = this.jalali.toString(period.to, { format: 'Y-M-D' });
        }

        const value: Date | null =
            this.data.value === undefined ? null : Helper.IS.date(this.data.value) ? this.data.value : null;

        this.current = '';
        if (value) {
            const period: JalaliDateTimePeriod = this.jalali.periodWeek(1, value);
            this.current = this.jalali.toString(period.from, { format: 'Y-M-D' });
        }
        this.month = this.jalali.toString(value || new Date(), { format: 'Y-M' });
        this.calendar = this.jalali.calendar(this.month);
    }

    changeMonth(change: number): void {
        let [year, month] = this.month.split('-').map((v: string) => +v);
        switch (change) {
            case 12:
            case -12:
                year += change === 12 ? 1 : -1;
                break;

            case 1:
            case -1:
                month += change;
                if (month === 13) {
                    year++;
                    month = 1;
                }
                if (month === 0) {
                    year--;
                    month = 12;
                }

                break;

            case 0:
                [year, month] = this.jalali
                    .toString(new Date(), { format: 'Y-M' })
                    .split('-')
                    .map((v: string) => +v);
                break;
        }

        this.month = year.toString() + '-' + month.toString().padStart(2, '0');
        this.calendar = this.jalali.calendar(this.month);
    }

    changeCalendar(year: number, month: number): void {
        this.month = year.toString() + '-' + month.toString().padStart(2, '0');
        this.calendar = this.jalali.calendar(this.month);
        this.showMonth = false;
    }

    setDate(value: string | null): void {
        if (value === null) return;

        const gregorian: string = this.jalali.gregorian(value).date;
        const date: Date = new Date(gregorian + 'T00:00:00.000');
        const period: JalaliDateTimePeriod = this.jalali.periodWeek(1, date);
        this.dialogRef.close({ from: period.from, to: period.to });
    }
}
