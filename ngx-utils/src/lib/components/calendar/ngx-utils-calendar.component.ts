import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Helper } from '@webilix/helper-library';
import { JalaliDateTime, JalaliDateTimePeriod } from '@webilix/jalali-date-time';

import { INgxUtilsCalendarPeriod } from '../../interfaces/ngx-utils-calendar';
import { NgxUtilsMenu } from '../../types/ngx-utils-menu';
import { NgxUtilsService } from '../../ngx-utils.service';

@Component({
    selector: 'ngx-utils-calendar',
    templateUrl: './ngx-utils-calendar.component.html',
    styleUrls: ['./ngx-utils-calendar.component.scss'],
})
export class NgxUtilsCalendarComponent implements OnInit, OnChanges {
    @Input() types: ('DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'PERIOD')[] = [];
    @Input() value?: Date;
    @Input() minDate?: Date;
    @Input() maxDate?: Date;
    @Output() changed: EventEmitter<INgxUtilsCalendarPeriod> = new EventEmitter<INgxUtilsCalendarPeriod>();

    public type: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'PERIOD' = 'DAY';
    public title: string = '';
    private titles = { DAY: 'روزانه', WEEK: 'هفتگی', MONTH: 'ماهانه', YEAR: 'سالانه', PERIOD: 'انتخابی' };

    public error: boolean = false;
    public from: Date = new Date();
    public to: Date = new Date();
    public period: string | [string, string] = '';

    public menu: NgxUtilsMenu[] = (
        [
            ['روزانه', 'DAY'],
            ['هفتگی', 'WEEK'],
            ['ماهانه', 'MONTH'],
            ['سالانه', 'YEAR'],
            ['انتخابی', 'PERIOD'],
        ] as [string, 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'PERIOD'][]
    ).map((m) => ({
        title: m[0],
        click: () => this.setPeriod(m[1]),
        hideOn: () => !this.types.includes(m[1]),
        disableOn: () => this.type === m[1],
    }));

    constructor(
        @Inject('NGX_UTILS_TIMEZONE') public readonly timezone: string,
        private readonly ngxUtilsService: NgxUtilsService,
    ) {}

    ngOnInit(): void {
        if (this.types.length === 0) this.types = ['DAY', 'WEEK', 'MONTH', 'YEAR', 'PERIOD'];
        this.setPeriod(this.types[0]);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.minDate && this.maxDate && this.minDate.getTime() >= this.maxDate.getTime()) {
            const temp = this.minDate;
            this.minDate = this.maxDate;
            this.maxDate = temp;
        }
    }

    setData(): void {
        const jalali = JalaliDateTime({ timezone: this.timezone });

        switch (this.type) {
            case 'DAY':
                this.period = jalali.toTitle(this.from);
                break;
            case 'WEEK':
                this.period = Helper.DATE.jalaliPeriod(this.from, this.to).replace('-', ' تا ');
                break;
            case 'MONTH':
                this.period = jalali.toTitle(this.from, { format: 'N Y' });
                break;
            case 'YEAR':
                this.period = jalali.toTitle(this.from, { format: 'Y' });
                break;
            case 'PERIOD':
                this.period = [
                    jalali.toTitle(this.from, { format: 'd N Y' }),
                    jalali.toTitle(this.to, { format: 'd N Y' }),
                ];
                break;
        }

        this.changed.emit({ from: this.from, to: this.to });
    }

    checkDate(date: Date): Date {
        if (this.minDate && date.getTime() < this.minDate.getTime()) date = this.minDate;
        if (this.maxDate && date.getTime() > this.maxDate.getTime()) date = this.maxDate;
        return date;
    }

    setPeriod(type: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'PERIOD'): void {
        const jalali = JalaliDateTime({ timezone: this.timezone });

        this.type = type;
        this.title = this.titles[this.type];
        const date: Date = this.checkDate(new Date());

        switch (this.type) {
            case 'DAY':
                const day: JalaliDateTimePeriod = jalali.periodDay(1, date);
                this.from = day.from;
                this.to = day.to;
                break;
            case 'WEEK':
                const week: JalaliDateTimePeriod = jalali.periodWeek(1, date);
                this.from = week.from;
                this.to = week.to;
                break;
            case 'MONTH':
                const month: JalaliDateTimePeriod = jalali.periodMonth(1, date);
                this.from = month.from;
                this.to = month.to;
                break;
            case 'YEAR':
                const year: string = jalali.toString(date, { format: 'Y' });
                const lastDay: string = jalali.daysInMonth(`${year}-12`).toString();
                this.from = jalali.periodDay(1, new Date(jalali.gregorian(`${year}-01-01`).date)).from;
                this.to = jalali.periodDay(1, new Date(jalali.gregorian(`${year}-12-${lastDay}`).date)).to;
                break;
            case 'PERIOD':
                this.from = this.checkDate(jalali.periodMonth(1, date).from);
                this.to = this.checkDate(jalali.periodDay(1, date).to);
                break;
        }

        this.setData();
    }

    getDate(): void {
        this.ngxUtilsService.getDate({ value: this.from, minDate: this.minDate, maxDate: this.maxDate }).then(
            (date: Date) => {
                const day: JalaliDateTimePeriod = JalaliDateTime({ timezone: this.timezone }).periodDay(1, date);
                this.from = day.from;
                this.to = day.to;
                this.setData();
            },
            () => {},
        );
    }

    getWeek(): void {
        this.ngxUtilsService.getWeek({ value: this.from, minDate: this.minDate, maxDate: this.maxDate }).then(
            (week: INgxUtilsCalendarPeriod) => {
                this.from = week.from;
                this.to = week.to;
                this.setData();
            },
            () => {},
        );
    }

    getMonth(): void {
        this.ngxUtilsService.getMonth({ value: this.from, minDate: this.minDate, maxDate: this.maxDate }).then(
            (month: INgxUtilsCalendarPeriod) => {
                this.from = month.from;
                this.to = month.to;
                this.setData();
            },
            () => {},
        );
    }

    getYear(): void {
        this.ngxUtilsService.getYear({ value: this.from, minDate: this.minDate, maxDate: this.maxDate }).then(
            (year: INgxUtilsCalendarPeriod) => {
                this.from = year.from;
                this.to = year.to;
                this.setData();
            },
            () => {},
        );
    }

    getPeriodFrom(): void {
        this.ngxUtilsService
            .getDate({ value: this.from, minDate: this.minDate, maxDate: this.to || this.maxDate })
            .then(
                (date: Date) => {
                    const day: JalaliDateTimePeriod = JalaliDateTime({ timezone: this.timezone }).periodDay(1, date);
                    this.from = day.from;
                    this.setData();
                },
                () => {},
            );
    }

    getPeriodTo(): void {
        this.ngxUtilsService
            .getDate({ value: this.to, minDate: this.from || this.minDate, maxDate: this.maxDate })
            .then(
                (date: Date) => {
                    const day: JalaliDateTimePeriod = JalaliDateTime({ timezone: this.timezone }).periodDay(1, date);
                    this.to = day.to;
                    this.setData();
                },
                () => {},
            );
    }
}
