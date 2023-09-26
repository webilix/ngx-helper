import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { NgxHelperBottomSheetModule } from '@webilix/ngx-helper/bottom-sheet';
import { NgxHelperCalendarModule } from '@webilix/ngx-helper/calendar';
import { NgxHelperMenuModule } from '@webilix/ngx-helper/menu';
import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';
import { NgxHelperPlateModule } from '@webilix/ngx-helper/plate';

import { NgxHelperParamPersianNumberDirective } from './ngx-helper-param.directive';
import { NgxHelperParamComponent } from './ngx-helper-param.component';
import { NgxHelperParamPlateComponent } from './plate/ngx-helper-param-plate.component';
import { NgxHelperParamSelectComponent } from './select/ngx-helper-param-select.component';

@NgModule({
    declarations: [
        NgxHelperParamPersianNumberDirective,

        NgxHelperParamComponent,
        NgxHelperParamPlateComponent,
        NgxHelperParamSelectComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgxMaskDirective,

        MatBottomSheetModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,

        NgxHelperBottomSheetModule,
        NgxHelperCalendarModule,
        NgxHelperMenuModule,
        NgxHelperPipeModule,
        NgxHelperPlateModule,
    ],
    providers: [DecimalPipe, provideEnvironmentNgxMask()],
    exports: [NgxHelperParamComponent],
})
export class NgxHelperParamModule {}
