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

import { INgxHelperCoordinates, INgxHelperCoordinatesConfig } from '../ngx-helper-coordinates.interface';

@Component({
    host: { selector: 'ngx-helper-coordinates-get' },
    templateUrl: './ngx-helper-coordinates-get.component.html',
    styleUrls: ['./ngx-helper-coordinates-get.component.scss'],
})
export class NgxHelperCoordinatesGetComponent implements OnInit {
    public map!: Map;
    public coordinates?: INgxHelperCoordinates;

    private coordinate: Coordinate = [];

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

    setCoordinates(event: MouseEvent): void {
        event.preventDefault();
        this.map
            .getLayers()
            .getArray()
            .forEach((layer: BaseLayer) => {
                if (layer instanceof VectorLayer) this.map.removeLayer(layer);
            });

        this.coordinate = this.map.getEventCoordinate(event).map((c: number) => +c.toFixed(7));
        this.coordinates = { latitude: this.coordinate[1], longitude: this.coordinate[0] };
        this.addLayer();
    }
}
