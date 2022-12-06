import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgxUtilsConnectionService {
    get connection(): boolean {
        return navigator.onLine;
    }

    private connectionChanged: Subject<boolean> = new Subject<boolean>();
    get onConnectionChanged(): Observable<boolean> {
        return this.connectionChanged.asObservable();
    }

    constructor() {
        window.addEventListener('online', () => {
            this.connectionChanged.next(true);
        });

        window.addEventListener('offline', () => {
            this.connectionChanged.next(false);
        });
    }
}
