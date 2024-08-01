import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Feature, Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import OSM from 'ol/source/OSM';
import BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import interactionDoubleClickZoom from 'ol/interaction/DoubleClickZoom';

import { Helper } from '@webilix/helper-library';

import { INgxHelperCoordinates, INgxHelperCoordinatesConfig } from '../ngx-helper-coordinates.interface';

@Component({
    host: { selector: 'ngx-helper-coordinates-get' },
    templateUrl: './ngx-helper-coordinates-get.component.html',
    styleUrls: ['./ngx-helper-coordinates-get.component.scss'],
})
export class NgxHelperCoordinatesGetComponent implements OnInit {
    public map!: Map;
    public coordinates?: INgxHelperCoordinates;

    public coordinate: Coordinate = [];
    public error?: 'LATITUDE' | 'LONGITUDE';

    public inputTransformFn = (value: any): string => Helper.STRING.changeNumbers(value.toString(), 'EN');

    constructor(
        @Inject('NGX_HELPER_PRIMARY_COLOR') private readonly primaryColor: string,
        @Inject(MAT_DIALOG_DATA)
        private readonly data: { coordinates?: INgxHelperCoordinates; config: INgxHelperCoordinatesConfig },
        private readonly matDialogRef: MatDialogRef<NgxHelperCoordinatesGetComponent>,
    ) {}

    ngOnInit(): void {
        this.coordinates = this.data.coordinates;
        this.coordinate = this.data.coordinates
            ? [this.data.coordinates.longitude, this.data.coordinates.latitude]
            : this.data.config.view
            ? [this.data.config.view.longitude, this.data.config.view.latitude]
            : [0, 0];

        this.map = new Map({
            view: new View({ center: this.coordinate, zoom: this.data.config.zoom, projection: 'EPSG:4326' }),
            layers: [new TileLayer({ source: new OSM() })],
            target: 'ngx-helper-map',
        });

        this.map
            .getInteractions()
            .getArray()
            .forEach((interaction) => {
                if (interaction instanceof interactionDoubleClickZoom) this.map.removeInteraction(interaction);
            });

        if (this.coordinates) this.addLayer();
    }

    select(): void {
        if (!this.coordinates) return;
        this.matDialogRef.close(this.coordinates);
    }

    addLayer(): void {
        this.map
            .getLayers()
            .getArray()
            .forEach((layer: BaseLayer) => {
                if (layer instanceof VectorLayer) this.map.removeLayer(layer);
            });

        if (this.coordinates) {
            const point = new Point(this.coordinate);
            const layer = new VectorLayer({
                source: new VectorSource({ features: [new Feature(point)] }),
                style: this.data.config.image
                    ? new Style({
                          image: new Icon({
                              src: this.data.config.image,
                              width: 30,
                              height: 30,
                              color: this.data.config.color,
                              displacement: [0, 15],
                          }),
                      })
                    : {
                          'circle-fill-color': this.data.config.color || this.primaryColor,
                          'circle-radius': 8,
                          'circle-stroke-color': '#FFF',
                          'circle-stroke-width': 1,
                      },
            });
            this.map.addLayer(layer);
        }
    }

    checkInputs(latitude: string, longitude: string): void {
        this.coordinates = undefined;
        this.addLayer();

        this.error = undefined;

        latitude = latitude.toString().trim();
        if (latitude === '' || isNaN(+latitude) || +latitude < -180 || +latitude > 180) {
            this.error = 'LATITUDE';
            return;
        }

        longitude = longitude.toString().trim();
        if (longitude === '' || isNaN(+longitude) || +longitude < -180 || +longitude > 180) {
            this.error = 'LONGITUDE';
            return;
        }

        if (this.coordinate[1] === +latitude && this.coordinate[0] === +longitude) return;

        const center: Coordinate = [+longitude, +latitude];
        this.map.getView().animate({ center, duration: 1000 });

        this.coordinate = [+longitude, +latitude];
        this.coordinates = { latitude: +latitude, longitude: +longitude };
        this.addLayer();
    }

    setCoordinates(event: MouseEvent): void {
        event.preventDefault();

        this.coordinate = this.map.getEventCoordinate(event).map((c: number) => +c.toFixed(7));
        this.coordinates = { latitude: this.coordinate[1], longitude: this.coordinate[0] };
        this.addLayer();
    }
}
