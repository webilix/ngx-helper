import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { NgxHelperButtonGroupComponent } from './ngx-helper-button-group.component';

@NgModule({
    declarations: [NgxHelperButtonGroupComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
    exports: [NgxHelperButtonGroupComponent],
})
export class NgxHelperButtonGroupModule {}
