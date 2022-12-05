import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { NgxUtilsViewPaginationComponent } from './pagination/ngx-utils-view-pagination.component';

@NgModule({
    declarations: [NgxUtilsViewPaginationComponent],
    imports: [CommonModule, MatButtonModule],
    exports: [NgxUtilsViewPaginationComponent],
})
export class NgxUtilsViewModule {}
