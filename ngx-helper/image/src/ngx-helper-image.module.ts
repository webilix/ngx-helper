import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperLoadingModule } from '@webilix/ngx-helper/loading';
import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';

import { NgxHelperImageService } from './ngx-helper-image.service';
import { NgxHelperImagePreviewComponent } from './preview/ngx-helper-image-preview.component';
import { NgxHelperImageGalleryComponent } from './gallery/ngx-helper-image-gallery.component';

@NgModule({
    declarations: [NgxHelperImagePreviewComponent, NgxHelperImageGalleryComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,

        MatDialogModule,
        MatIconModule,

        NgxHelperLoadingModule,
        NgxHelperPipeModule,
    ],
    providers: [NgxHelperImageService],
})
export class NgxHelperImageModule {}
