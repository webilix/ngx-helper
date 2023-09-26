import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { NgxHelperPaginationComponent } from './ngx-helper-pagination.component';

@NgModule({
    declarations: [NgxHelperPaginationComponent],
    imports: [CommonModule, MatButtonModule],
    exports: [NgxHelperPaginationComponent],
})
export class NgxHelperPaginationModule {}
