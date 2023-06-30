import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Feature, Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { INgxHelperCoordinates, INgxHelperCoordinatesConfig } from '../../../interfaces';

@Component({
    host: { selector: 'ngx-helper-coordinates-show' },
    templateUrl: './ngx-helper-coordinates-show.component.html',
    styleUrls: ['./ngx-helper-coordinates-show.component.scss'],
})
export class NgxHelperCoordinatesShowComponent implements OnInit {
    public map!: Map;
    public coordinates: INgxHelperCoordinates = this.data.coordinates;

    constructor(
        @Inject('NGX_HELPER_PRIMARY_COLOR') private readonly primaryColor: string,
        @Inject(MAT_DIALOG_DATA)
        private readonly data: { coordinates: INgxHelperCoordinates; config: INgxHelperCoordinatesConfig },
    ) {}

    ngOnInit(): void {
        const coordinate: Coordinate = [this.data.coordinates.longitude, this.data.coordinates.latitude];
        const point = new Point(coordinate);

        this.map = new Map({
            view: new View({ center: coordinate, zoom: this.data.config.zoom, projection: 'EPSG:4326' }),
            layers: [
                new TileLayer({ source: new OSM() }),
                new VectorLayer({
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
                }),
            ],
            target: 'ngx-helper-map',
        });
    }
}
