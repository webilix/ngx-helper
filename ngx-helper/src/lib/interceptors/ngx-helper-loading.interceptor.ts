import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { NgxHelperLoadingService } from '../providers/ngx-helper-loading.service';
import { NGX_HELPER_LOADING_HEADER } from '../ngx-helper.values';

@Injectable()
export class NgxHelperLoadingInterceptor implements HttpInterceptor {
    constructor(private readonly ngxHelperLoadingService: NgxHelperLoadingService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const header: string | null = request.headers.get(NGX_HELPER_LOADING_HEADER);
        const loading: boolean = header === 'Y' || header === null;
        if (loading) this.ngxHelperLoadingService.set('HTTP', true);

        const headers: HttpHeaders = request.headers.delete(NGX_HELPER_LOADING_HEADER);
        return next
            .handle(request.clone({ headers }))
            .pipe(finalize(() => this.ngxHelperLoadingService.set('HTTP', false)));
    }
}
