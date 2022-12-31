import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Params, Router } from '@angular/router';

import { Helper } from '@webilix/helper-library';
import { JalaliDateTime, JalaliDateTimePeriod } from '@webilix/jalali-date-time';
import { Validator } from '@webilix/validator-library';

import { INgxUtilsCalendarPeriod, INgxUtilsCalendarValue, NgxUtilsCalendar } from '../../interfaces/ngx-utils-calendar';
import { NgxUtilsMenu } from '../../types/ngx-utils-menu';
import { NgxUtilsService } from '../../ngx-utils.service';

@Component({
    selector: 'ngx-utils-calendar',
    templateUrl: './ngx-utils-calendar.component.html',
    styleUrls: ['./ngx-utils-calendar.component.scss'],
})
export class NgxUtilsCalendarComponent implements OnInit, OnChanges {
    @Input() types: NgxUtilsCalendar[] = [];
    @Input() route: string[] = [];
    @Input() value?: Date;
    @Input() minDate?: Date;
    @Input() maxDate?: Date;
    @Output() changed: EventEmitter<INgxUtilsCalendarValue> = new EventEmitter<INgxUtilsCalendarValue>();

    public type: NgxUtilsCalendar = 'DAY';
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
        ] as [string, NgxUtilsCalendar][]
    ).map((m) => ({
        title: m[0],
        click: () => this.setPeriod(m[1]),
        hideOn: () => !this.types.includes(m[1]),
        disableOn: () => this.type === m[1],
    }));

    constructor(
        @Inject('NGX_UTILS_TIMEZONE') public readonly timezone: string,
        private readonly router: Router,
        private readonly ngxUtilsService: NgxUtilsService,
    ) {}

    ngOnInit(): void {
        if (this.types.length === 0) this.types = ['DAY', 'WEEK', 'MONTH', 'YEAR', 'PERIOD'];

        const jalali = JalaliDateTime({ timezone: this.timezone });
        const queryParams: Params = this.getQueryParams();
        const type: NgxUtilsCalendar =
            this.route.length !== 0 &&
            ['DAY', 'WEEK', 'MONTH', 'YEAR', 'PERIOD'].includes(queryParams['ngx-utils-calendar-type'])
                ? queryParams['ngx-utils-calendar-type']
                : this.types[0];
        const from: Date =
            this.route.length !== 0 && Validator.STRING.isDate(queryParams['ngx-utils-calendar-from'])
                ? new Date(`${jalali.gregorian(queryParams['ngx-utils-calendar-from']).date}T00:00:00`)
                : new Date();
        const to: Date =
            this.route.length !== 0 && Validator.STRING.isDate(queryParams['ngx-utils-calendar-to'])
                ? new Date(`${jalali.gregorian(queryParams['ngx-utils-calendar-to']).date}T00:00:00`)
                : new Date();

        this.setPeriod(type, from, to);
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

        if (this.route.length !== 0) {
            const queryParams: Params = this.getQueryParams();

            queryParams['ngx-utils-calendar-type'] = this.type;
            queryParams['ngx-utils-calendar-from'] = jalali.toString(this.from, { format: 'Y-M-D' });
            queryParams['ngx-utils-calendar-to'] = jalali.toString(this.to, { format: 'Y-M-D' });
            this.router.navigate(this.route, { queryParams });
        }

        this.changed.emit({
            type: this.type,
            period: { from: this.from, to: this.to },
        });
    }

    getQueryParams(): Params {
        const params: URLSearchParams = new URLSearchParams(window.location.search);
        const queryParams: Params = {};
        params.forEach((value: string, key: string) => (queryParams[key] = value));
        return queryParams;
    }

    checkDate(date: Date): Date {
        if (this.minDate && date.getTime() < this.minDate.getTime()) date = this.minDate;
        if (this.maxDate && date.getTime() > this.maxDate.getTime()) date = this.maxDate;
        return date;
    }

    setPeriod(type: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'PERIOD', from?: Date, to?: Date): void {
        const jalali = JalaliDateTime({ timezone: this.timezone });

        this.type = type;
        this.title = this.titles[this.type];
        const date: Date = this.checkDate(from || new Date());

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
                this.to = this.checkDate(jalali.periodDay(1, this.checkDate(to || date)).to);
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
