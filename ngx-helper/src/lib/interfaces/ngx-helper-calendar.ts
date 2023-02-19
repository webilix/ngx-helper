export type NgxHelperCalendar = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'PERIOD';

export interface INgxHelperCalendarConfig {
    title: string | null;
    value: Date | null;
    minDate: Date | null;
    maxDate: Date | null;
}

export interface INgxHelperCalendarPeriod {
    from: Date;
    to: Date;
}

export interface INgxHelperCalendarValue {
    type: NgxHelperCalendar;
    period: INgxHelperCalendarPeriod;
}
