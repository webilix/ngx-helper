import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperBottomSheetComponent } from './ngx-helper-bottom-sheet.component';
import { NgxHelperBottomSheetService } from './ngx-helper-bottom-sheet.service';

@NgModule({
    declarations: [NgxHelperBottomSheetComponent],
    imports: [CommonModule, MatBottomSheetModule, MatIconModule],
    providers: [NgxHelperBottomSheetService],
})
export class NgxHelperBottomSheetModule {}
