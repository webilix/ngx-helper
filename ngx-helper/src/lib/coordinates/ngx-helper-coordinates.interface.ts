export interface INgxHelperCoordinates {
    latitude: number;
    longitude: number;
}

export interface INgxHelperCoordinatesConfig {
    zoom: number;
    image?: string;
    color?: string;
    view?: INgxHelperCoordinates;
}
