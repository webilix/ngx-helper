import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NgxHelperPipeModule } from '@webilix/ngx-helper/pipe';
import { NgxHelperLoaderModule } from '@webilix/ngx-helper/loader';

import { NgxHelperImageService } from './ngx-helper-image.service';
import { NgxHelperImagePreviewComponent } from './preview/ngx-helper-image-preview.component';
import { NgxHelperImageGalleryComponent } from './gallery/ngx-helper-image-gallery.component';

@NgModule({
    declarations: [NgxHelperImagePreviewComponent, NgxHelperImageGalleryComponent],
    imports: [CommonModule, MatDialogModule, MatIconModule, NgxHelperPipeModule, NgxHelperLoaderModule],
    providers: [NgxHelperImageService],
})
export class NgxHelperImageModule {}
