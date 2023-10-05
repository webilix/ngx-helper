import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { NgxHelperValueModule } from '@webilix/ngx-helper/value';

import { NgxHelperTagComponent } from './ngx-helper-tag.component';

@NgModule({
    declarations: [NgxHelperTagComponent],
    imports: [CommonModule, MatIconModule, NgxHelperValueModule],
    exports: [NgxHelperTagComponent],
})
export class NgxHelperTagModule {}
