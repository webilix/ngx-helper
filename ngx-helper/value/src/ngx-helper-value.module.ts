import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperValueComponent } from './ngx-helper-value.component';
import { NgxHelperValuePipe } from './ngx-helper-value.pipe';

@NgModule({
    declarations: [NgxHelperValuePipe, NgxHelperValueComponent],
    imports: [CommonModule, ClipboardModule, MatIconModule],
    providers: [NgxHelperValuePipe],
    exports: [NgxHelperValuePipe, NgxHelperValueComponent],
})
export class NgxHelperValueModule {}
