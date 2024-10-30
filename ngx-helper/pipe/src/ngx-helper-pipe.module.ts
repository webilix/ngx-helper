import { NgModule } from '@angular/core';

import { NgxHelperBankCardPipe } from './ngx-helper-bank-card.pipe';
import { NgxHelperDurationPipe } from './ngx-helper-duration.pipe';
import { NgxHelperFileSizePipe } from './ngx-helper-file-size.pipe';
import { NgxHelperJalaliPipe } from './ngx-helper-jalali.pipe';
import { NgxHelperMobilePipe } from './ngx-helper-mobile.pipe';
import { NgxHelperMonthPipe } from './ngx-helper-month.pipe';
import { NgxHelperMultiLinePipe } from './ngx-helper-multi-line.pipe';
import { NgxHelperPeriodPipe } from './ngx-helper-period.pipe';
import { NgxHelperPricePipe } from './ngx-helper-price.pipe';
import { NgxHelperSafePipe } from './ngx-helper-safe.pipe';
import { NgxHelperVolumePipe } from './ngx-helper-volume.pipe';
import { NgxHelperWeightPipe } from './ngx-helper-weight.pipe';

@NgModule({
    declarations: [
        NgxHelperBankCardPipe,
        NgxHelperDurationPipe,
        NgxHelperFileSizePipe,
        NgxHelperJalaliPipe,
        NgxHelperMobilePipe,
        NgxHelperMonthPipe,
        NgxHelperMultiLinePipe,
        NgxHelperPeriodPipe,
        NgxHelperPricePipe,
        NgxHelperSafePipe,
        NgxHelperVolumePipe,
        NgxHelperWeightPipe,
    ],
    exports: [
        NgxHelperBankCardPipe,
        NgxHelperDurationPipe,
        NgxHelperFileSizePipe,
        NgxHelperJalaliPipe,
        NgxHelperMobilePipe,
        NgxHelperMonthPipe,
        NgxHelperMultiLinePipe,
        NgxHelperPeriodPipe,
        NgxHelperPricePipe,
        NgxHelperSafePipe,
        NgxHelperVolumePipe,
        NgxHelperWeightPipe,
    ],
})
export class NgxHelperPipeModule {}
