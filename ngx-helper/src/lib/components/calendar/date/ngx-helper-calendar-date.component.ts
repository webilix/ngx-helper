import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { JalaliDateTime, JalaliDateTimeCalendar } from '@webilix/jalali-date-time';
import { Helper } from '@webilix/helper-library';

import { INgxHelperCalendarConfig } from '../../../interfaces/ngx-helper-calendar';

@Component({
    templateUrl: './ngx-helper-calendar-date.component.html',
    styleUrls: ['./ngx-helper-calendar-date.component.scss'],
})
export class NgxHelperCalendarDateComponent implements OnInit {
    private jalali = JalaliDateTime({ timezone: this.timezone });

    public title: string = this.data.title || 'انتخاب تاریخ';
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
        private readonly dialogRef: MatDialogRef<NgxHelperCalendarDateComponent>,
    ) {}

    ngOnInit(): void {
        this.today = this.jalali.toString(new Date(), { format: 'Y-M-D' });
        this.minDate = this.data.minDate ? this.jalali.toString(this.data.minDate, { format: 'Y-M-D' }) : '0000-00-00';
        this.maxDate = this.data.maxDate ? this.jalali.toString(this.data.maxDate, { format: 'Y-M-D' }) : '9999-99-99';

        const value: Date | null =
            this.data.value === undefined ? null : Helper.IS.date(this.data.value) ? this.data.value : null;

        this.current = value ? this.jalali.toString(value, { format: 'Y-M-D' }) : '';
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
        this.dialogRef.close(date);
    }
}
