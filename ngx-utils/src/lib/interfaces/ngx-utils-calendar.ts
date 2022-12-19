export interface INgxUtilsCalendarConfig {
    title: string | null;
    value: Date | null;
    minDate: Date | null;
    maxDate: Date | null;
}

export interface INgxUtilsCalendarPeriod {
    from: Date;
    to: Date;
}
