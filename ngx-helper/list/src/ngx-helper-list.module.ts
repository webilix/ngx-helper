import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxHelperMenuModule } from '@webilix/ngx-helper/menu';

import { NgxHelperListComponent } from './ngx-helper-list.component';

@NgModule({
    declarations: [NgxHelperListComponent],
    imports: [CommonModule, NgxHelperMenuModule],
    exports: [NgxHelperListComponent],
})
export class NgxHelperListModule {}
