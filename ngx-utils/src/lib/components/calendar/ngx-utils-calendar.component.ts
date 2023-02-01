import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Params, Router } from '@angular/router';

import { JalaliDateTime, JalaliDateTimePeriod } from '@webilix/jalali-date-time';
import { Helper } from '@webilix/helper-library';

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

    public previous: { active: boolean; date: Date; check?: Date } = { active: false, date: new Date() };
    public next: { active: boolean; date: Date; check?: Date } = { active: false, date: new Date() };
    public methods: {
        [key in NgxUtilsCalendar]: (v: number, d?: Date, t?: string) => JalaliDateTimePeriod;
    } = {
        DAY: JalaliDateTime().periodDay,
        WEEK: JalaliDateTime().periodWeek,
        MONTH: JalaliDateTime().periodMonth,
        YEAR: JalaliDateTime().periodYear,
        PERIOD: JalaliDateTime().periodDay,
    };

    public menu: NgxUtilsMenu[] = [];

    constructor(
        @Inject('NGX_UTILS_TIMEZONE') public readonly timezone: string,
        private readonly router: Router,
        private readonly ngxUtilsService: NgxUtilsService,
    ) {}

    ngOnInit(): void {
        if (this.types.length === 0) this.types = ['DAY', 'WEEK', 'MONTH', 'YEAR', 'PERIOD'];

        const types: [string, NgxUtilsCalendar][] = [
            ['روزانه', 'DAY'],
            ['هفتگی', 'WEEK'],
            ['ماهانه', 'MONTH'],
            ['سالانه', 'YEAR'],
            ['انتخابی', 'PERIOD'],
        ];
        this.menu = types
            .filter((m) => this.types.includes(m[1]))
            .map((m) => ({
                title: m[0],
                click: () => this.setPeriod(m[1]),
                disableOn: () => this.type === m[1],
            }));

        const jalali = JalaliDateTime({ timezone: this.timezone });
        const queryParams: Params = this.getQueryParams();
        const type: NgxUtilsCalendar =
            this.route.length !== 0 && this.types.includes(queryParams['ngx-utils-calendar-type'])
                ? queryParams['ngx-utils-calendar-type']
                : this.types[0];
        const from: Date =
            this.route.length !== 0 && Helper.IS.STRING.date(queryParams['ngx-utils-calendar-from'])
                ? new Date(`${jalali.gregorian(queryParams['ngx-utils-calendar-from']).date}T00:00:00`)
                : new Date();
        const to: Date =
            this.route.length !== 0 && Helper.IS.STRING.date(queryParams['ngx-utils-calendar-to'])
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

        if (this.type !== 'PERIOD') {
            this.previous.check = this.minDate
                ? this.methods[this.type](1, this.minDate, this.timezone).from
                : undefined;
            this.previous.date = this.methods[this.type](1, new Date(this.from.getTime() - 1), this.timezone).from;
            this.next.check = this.maxDate ? this.methods[this.type](1, this.maxDate, this.timezone).to : undefined;
            this.next.date = this.methods[this.type](1, new Date(this.to.getTime() + 1), this.timezone).to;

            this.previous.active =
                !this.previous.check || this.previous.date.getTime() >= this.previous.check.getTime();
            this.next.active = !this.next.check || this.next.date.getTime() <= this.next.check.getTime();
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
            case 'WEEK':
            case 'MONTH':
            case 'YEAR':
                const period: JalaliDateTimePeriod = this.methods[this.type](1, date, this.timezone);
                this.from = period.from;
                this.to = period.to;
                break;
            case 'PERIOD':
                this.from = this.checkDate(jalali.periodMonth(1, date).from);
                this.to = this.checkDate(jalali.periodDay(1, this.checkDate(to || date)).to);
                break;
        }

        this.setData();
    }

    setPN(type: 'PREVIOUS' | 'NEXT'): void {
        if (this.type === 'PERIOD') return;
        if ((type === 'PREVIOUS' && !this.previous.active) || (type === 'NEXT' && !this.next.active)) return;

        if (type === 'PREVIOUS') {
            this.from = this.previous.date;
            this.to = this.methods[this.type](1, this.previous.date, this.timezone).to;
        } else {
            this.to = this.next.date;
            this.from = this.methods[this.type](1, this.next.date, this.timezone).from;
        }

        this.setData();
    }

    getValue(): void {
        switch (this.type) {
            case 'DAY':
                this.getDate();
                break;
            case 'WEEK':
                this.getWeek();
                break;
            case 'MONTH':
                this.getMonth();
                break;
            case 'YEAR':
                this.getYear();
                break;
        }
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
