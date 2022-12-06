import { Component, Inject, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ngx-utils-gallery.component.html',
    styleUrls: ['./ngx-utils-gallery.component.scss'],
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
export class NgxUtilsGalleryComponent implements OnInit {
    public loading: boolean = false;

    public image: string = '';
    public description?: string;

    public index: number = 0;
    public images: { image: string; description?: string }[] = this.data.images.map((image) =>
        typeof image === 'string' ? { image } : image,
    );

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: { index: number; images: (string | { image: string; description?: string })[] },
    ) {}

    ngOnInit(): void {
        this.changeIndex(this.data.index);
    }

    changeIndex(change: number): void {
        this.index = (this.images.length + this.index + change) % this.images.length;
        this.image = this.images[this.index].image;
        this.description = this.images[this.index].description;

        this.loading = true;
        const image: HTMLImageElement = new Image();
        image.onload = () => (this.loading = false);
        image.src = this.image;
    }
}
