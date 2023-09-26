import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperCoordinatesGetComponent } from './get/ngx-helper-coordinates-get.component';
import { NgxHelperCoordinatesShowComponent } from './show/ngx-helper-coordinates-show.component';

import { NgxHelperCoordinatesService } from './ngx-helper-coordinates.service';

@NgModule({
    declarations: [NgxHelperCoordinatesGetComponent, NgxHelperCoordinatesShowComponent],
    imports: [CommonModule, MatDialogModule, MatIconModule],
    providers: [NgxHelperCoordinatesService],
})
export class NgxHelperCoordinatesModule {}
