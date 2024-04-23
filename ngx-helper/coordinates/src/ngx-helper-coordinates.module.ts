import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperCoordinatesGetComponent } from './get/ngx-helper-coordinates-get.component';
import { NgxHelperCoordinatesShowComponent } from './show/ngx-helper-coordinates-show.component';

import { NgxHelperCoordinatesService } from './ngx-helper-coordinates.service';

@NgModule({
    declarations: [NgxHelperCoordinatesGetComponent, NgxHelperCoordinatesShowComponent],
    imports: [CommonModule, NgxMaskDirective, MatDialogModule, MatIconModule],
    providers: [provideNgxMask(), NgxHelperCoordinatesService],
})
export class NgxHelperCoordinatesModule {}
