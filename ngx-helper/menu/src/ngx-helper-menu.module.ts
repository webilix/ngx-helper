import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { NgxHelperMenuComponent } from './ngx-helper-menu.component';

@NgModule({
    declarations: [NgxHelperMenuComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
    exports: [NgxHelperMenuComponent],
})
export class NgxHelperMenuModule {}
