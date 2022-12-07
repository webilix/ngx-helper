import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { NgxUtilsLoadingService } from '../providers/ngx-utils-loading.service';
import { NGX_UTILS_LOADING_HEADER } from '../ngx-utils.data';

@Injectable()
export class NgxUtilsLoadingInterceptor implements HttpInterceptor {
    constructor(private readonly ngxUtilsLoadingService: NgxUtilsLoadingService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const header: string | null = request.headers.get(NGX_UTILS_LOADING_HEADER);
        const loading: boolean = header === 'Y' || header === null;
        if (loading) this.ngxUtilsLoadingService.set('HTTP', true);

        const headers: HttpHeaders = request.headers.delete(NGX_UTILS_LOADING_HEADER);
        return next
            .handle(request.clone({ headers }))
            .pipe(finalize(() => this.ngxUtilsLoadingService.set('HTTP', false)));
    }
}
