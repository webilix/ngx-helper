import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { NgxHelperLoaderComponent } from './ngx-helper-loader.component';

@NgModule({
    declarations: [NgxHelperLoaderComponent],
    imports: [CommonModule, MatIconModule],
    exports: [NgxHelperLoaderComponent],
})
export class NgxHelperLoaderModule {}
