import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { NgxHelperProgressComponent } from './ngx-helper-progress.component';

@NgModule({
    declarations: [NgxHelperProgressComponent],
    imports: [CommonModule, MatIconModule],
    exports: [NgxHelperProgressComponent],
})
export class NgxHelperProgressModule {}
