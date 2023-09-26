import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { NgxHelperMenuModule } from '@webilix/ngx-helper/menu';

import { NgxHelperBoxComponent } from './ngx-helper-box.component';

@NgModule({
    declarations: [NgxHelperBoxComponent],
    imports: [CommonModule, MatIconModule, NgxHelperMenuModule],
    exports: [NgxHelperBoxComponent],
})
export class NgxHelperBoxModule {}
