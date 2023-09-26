import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperMenuModule } from '@webilix/ngx-helper/menu';

import { NgxHelperCalendarService } from './ngx-helper-calendar.service';
import { NgxHelperCalendarComponent } from './ngx-helper-calendar.component';
import { NgxHelperCalendarDateComponent } from './date/ngx-helper-calendar-date.component';
import { NgxHelperCalendarWeekComponent } from './week/ngx-helper-calendar-week.component';
import { NgxHelperCalendarMonthComponent } from './month/ngx-helper-calendar-month.component';
import { NgxHelperCalendarYearComponent } from './year/ngx-helper-calendar-year.component';

@NgModule({
    declarations: [
        NgxHelperCalendarComponent,

        NgxHelperCalendarDateComponent,
        NgxHelperCalendarWeekComponent,
        NgxHelperCalendarMonthComponent,
        NgxHelperCalendarYearComponent,
    ],
    imports: [CommonModule, MatDialogModule, MatIconModule, NgxHelperMenuModule],
    providers: [NgxHelperCalendarService],
    exports: [NgxHelperCalendarComponent],
})
export class NgxHelperCalendarModule {}
