import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { NgxHelperLoadingComponent } from './ngx-helper-loading.component';

@NgModule({
    declarations: [NgxHelperLoadingComponent],
    imports: [CommonModule, MatIconModule],
    exports: [NgxHelperLoadingComponent],
})
export class NgxHelperLoadingModule {}
