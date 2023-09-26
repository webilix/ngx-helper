import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { NgxHelperCalendarDateComponent } from './date/ngx-helper-calendar-date.component';
import { NgxHelperCalendarWeekComponent } from './week/ngx-helper-calendar-week.component';
import { NgxHelperCalendarMonthComponent } from './month/ngx-helper-calendar-month.component';
import { NgxHelperCalendarYearComponent } from './year/ngx-helper-calendar-year.component';

import { INgxHelperCalendarConfig, INgxHelperCalendarPeriod } from './ngx-helper-calendar.interface';

@Injectable()
export class NgxHelperCalendarService {
    private _dialogConfig: MatDialogConfig = {
        autoFocus: false,
        width: 'calc(100vw - 4rem)',
        maxWidth: 'var(--ngxHelperDialogWidth)',
        maxHeight: '80vh',
        direction: 'rtl',
        disableClose: true,
    };

    constructor(private readonly matDialog: MatDialog) {}

    private getCalendarConfig(config?: Partial<INgxHelperCalendarConfig>): INgxHelperCalendarConfig {
        let minDate: Date | null = config?.minDate || null;
        let maxDate: Date | null = config?.maxDate || null;
        if (minDate && maxDate && minDate.getTime() >= maxDate.getTime()) {
            const temp = minDate;
            minDate = maxDate;
            maxDate = temp;
        }

        return { title: config?.title || null, value: config?.value || null, minDate, maxDate };
    }

    getDate(callback: (date: Date) => void): void;
    getDate(config: Partial<INgxHelperCalendarConfig>, callback: (date: Date) => void): void;
    getDate(arg1: any, arg2?: any): void {
        const callback: (date: Date) => void = arg2 || arg1;
        const config: Partial<INgxHelperCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.matDialog
            .open(NgxHelperCalendarDateComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((date: Date) => date && callback(date));
    }

    getWeek(callback: (period: INgxHelperCalendarPeriod) => void): void;
    getWeek(config: Partial<INgxHelperCalendarConfig>, callback: (period: INgxHelperCalendarPeriod) => void): void;
    getWeek(arg1: any, arg2?: any): void {
        const callback: (period: INgxHelperCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxHelperCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.matDialog
            .open(NgxHelperCalendarWeekComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((week: INgxHelperCalendarPeriod) => week && callback(week));
    }

    getMonth(callback: (period: INgxHelperCalendarPeriod) => void): void;
    getMonth(config: Partial<INgxHelperCalendarConfig>, callback: (period: INgxHelperCalendarPeriod) => void): void;
    getMonth(arg1: any, arg2?: any): void {
        const callback: (period: INgxHelperCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxHelperCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.matDialog
            .open(NgxHelperCalendarMonthComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((month: INgxHelperCalendarPeriod) => month && callback(month));
    }

    getYear(callback: (period: INgxHelperCalendarPeriod) => void): void;
    getYear(config: Partial<INgxHelperCalendarConfig>, callback: (period: INgxHelperCalendarPeriod) => void): void;
    getYear(arg1: any, arg2?: any): void {
        const callback: (period: INgxHelperCalendarPeriod) => void = arg2 || arg1;
        const config: Partial<INgxHelperCalendarConfig> = typeof arg2 === 'function' ? arg1 : {};

        this.matDialog
            .open(NgxHelperCalendarYearComponent, { ...this._dialogConfig, data: this.getCalendarConfig(config) })
            .afterClosed()
            .subscribe((month: INgxHelperCalendarPeriod) => month && callback(month));
    }
}
