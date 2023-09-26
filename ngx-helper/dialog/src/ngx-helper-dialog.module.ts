import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperDialogComponent } from './ngx-helper-dialog.component';
import { NgxHelperDialogService } from './ngx-helper-dialog.service';

@NgModule({
    declarations: [NgxHelperDialogComponent],
    imports: [CommonModule, MatDialogModule, MatIconModule],
    providers: [NgxHelperDialogService],
})
export class NgxHelperDialogModule {}
