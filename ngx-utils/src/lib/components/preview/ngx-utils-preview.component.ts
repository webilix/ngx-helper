import { Component, Inject, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ngx-utils-preview.component.html',
    styleUrls: ['./ngx-utils-preview.component.scss'],
    animations: [
        trigger('image', [
            transition(':enter', [
                style({ width: 0, opacity: 0 }),
                animate('250ms ease-in-out', style({ width: '*', opacity: 1 })),
            ]),
        ]),
        trigger('description', [
            transition(':enter', [
                style({ height: 0, opacity: 0 }),
                animate('250ms ease-in-out', style({ height: '7rem', opacity: 1 })),
            ]),
        ]),
    ],
})
export class NgxUtilsPreviewComponent implements OnInit {
    public loading: boolean = false;
    public image: string = this.data.image;
    public description: string | undefined = this.data.description;

    constructor(@Inject(MAT_DIALOG_DATA) private readonly data: { image: string; description?: string }) {}

    ngOnInit(): void {
        this.loading = true;
        const image: HTMLImageElement = new Image();
        image.onload = () => (this.loading = false);
        image.src = this.data.image;
    }
}
