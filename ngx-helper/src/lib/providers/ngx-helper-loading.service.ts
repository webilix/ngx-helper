import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Helper } from '@webilix/helper-library';

@Injectable({ providedIn: 'root' })
export class NgxHelperLoadingService {
    private _route: boolean = false;
    private _http: boolean = false;

    get loading(): boolean {
        return this._route || this._http;
    }

    private loadingChanged: Subject<boolean> = new Subject<boolean>();
    get onLoadingChanged(): Observable<boolean> {
        return this.loadingChanged.asObservable();
    }

    constructor(private readonly router: Router) {
        this._http = this._route = false;
        this.router.events.forEach((event) => {
            let loading: boolean | null = null;
            if (event instanceof NavigationStart) loading = true;

            if (
                event instanceof NavigationError ||
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel
            ) {
                loading = false;
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }

            if (Helper.IS.boolean(loading)) this.set('ROUTE', !!loading);
        });
    }

    set(type: 'ROUTE' | 'HTTP', loading: boolean): void {
        type === 'ROUTE' ? (this._route = loading) : (this._http = loading);
        this.loadingChanged.next(this._route || this._http);
    }
}
