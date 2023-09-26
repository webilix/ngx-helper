import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperConfirmComponent } from './ngx-helper-confirm.component';
import { NgxHelperConfirmService } from './ngx-helper-confirm.service';

@NgModule({
    declarations: [NgxHelperConfirmComponent],
    imports: [CommonModule, MatBottomSheetModule, MatButtonModule, MatIconModule],
    providers: [NgxHelperConfirmService],
})
export class NgxHelperConfirmModule {}
