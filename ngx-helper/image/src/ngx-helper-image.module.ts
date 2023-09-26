import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperLoadingModule } from '@webilix/ngx-helper/loading';
import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';

import { NgxHelperImageService } from './ngx-helper-image.service';
import { NgxHelperGalleryComponent } from './gallery/ngx-helper-gallery.component';
import { NgxHelperPreviewComponent } from './preview/ngx-helper-preview.component';

@NgModule({
    declarations: [NgxHelperGalleryComponent, NgxHelperPreviewComponent],
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
