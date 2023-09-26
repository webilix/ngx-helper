import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { NgxHelperBottomSheetComponent } from './ngx-helper-bottom-sheet.component';
import { NgxHelperBottomSheetService } from './ngx-helper-bottom-sheet.service';

@NgModule({
    declarations: [NgxHelperBottomSheetComponent],
    imports: [CommonModule, MatIconModule, MatBottomSheetModule],
    providers: [NgxHelperBottomSheetService],
})
export class NgxHelperBottomSheetModule {}
