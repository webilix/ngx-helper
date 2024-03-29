import { Injectable } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { NgxHelperImagePreviewComponent } from './preview/ngx-helper-image-preview.component';
import { NgxHelperImageGalleryComponent } from './gallery/ngx-helper-image-gallery.component';

@Injectable()
export class NgxHelperImageService {
    private _dialogConfig: MatDialogConfig = {
        autoFocus: false,
        width: '100vw',
        maxWidth: 'none',
        height: '100vh',
        maxHeight: 'none',
        direction: 'rtl',
        hasBackdrop: false,
        panelClass: 'ngx-helper-full-dialog',
    };

    constructor(private readonly matDialog: MatDialog) {}

    preview(image: string, description?: string, html: boolean = false): void {
        this.matDialog.open(NgxHelperImagePreviewComponent, {
            ...this._dialogConfig,
            data: { image, description, html },
        });
    }

    gallery(images: (string | { image: string; description?: string })[], index?: number, html: boolean = false): void {
        this.matDialog.open(NgxHelperImageGalleryComponent, {
            ...this._dialogConfig,
            data: { index: index && images[index] ? index : 0, images, html },
        });
    }
}
