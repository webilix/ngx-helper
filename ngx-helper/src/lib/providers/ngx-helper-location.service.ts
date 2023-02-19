import { Injectable } from '@angular/core';

import { INgxHelperLocation } from '../interfaces/ngx-helper-location';

@Injectable({ providedIn: 'root' })
export class NgxHelperLocationService {
    getLocation(): Promise<INgxHelperLocation> {
        return new Promise<INgxHelperLocation>((resolve, reject) => {
            if (!navigator.geolocation) return reject('Geolocation is not supported by this browser.');

            navigator.geolocation.getCurrentPosition(
                (response: GeolocationPosition) =>
                    resolve({ latitude: response.coords.latitude, longitude: response.coords.longitude }),
                (err: GeolocationPositionError) => reject(err.message),
            );
        });
    }

    getDistance(from: INgxHelperLocation, to: INgxHelperLocation): number {
        const R = 6371e3; // metres
        const φ1 = (from.latitude * Math.PI) / 180; // φ, λ in radians
        const φ2 = (to.latitude * Math.PI) / 180;
        const Δφ = ((to.latitude - from.latitude) * Math.PI) / 180;
        const Δλ = ((to.longitude - from.longitude) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(R * c); // in metres
    }
}
