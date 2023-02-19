import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ngx-helper-map.component.html',
    styleUrls: ['./ngx-helper-map.component.scss'],
})
export class NgxHelperMapComponent {
    public latitude: number = this.data.position.latitude;
    public longitude: number = this.data.position.longitude;
    public url: string = `https://maps.google.com/maps?q=@${this.latitude},${this.longitude}&z=${this.data.zoom}&ie=UTF8&output=embed`;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: { zoom: number; position: { latitude: number; longitude: number } },
    ) {}
}
