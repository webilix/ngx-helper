import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { NgxUtilsLoadingService } from '../providers/ngx-utils-loading.service';

@Injectable()
export class NgxUtilsLoadingInterceptor implements HttpInterceptor {
    constructor(private readonly ngxUtilsLoadingService: NgxUtilsLoadingService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const header: string | null = request.headers.get('X-NgxUtilsLoading');
        const loading: boolean = header === 'Y' || header === null;
        if (loading) this.ngxUtilsLoadingService.set('HTTP', true);

        const headers: HttpHeaders = request.headers.delete('X-NgxUtilsLoading');
        return next
            .handle(request.clone({ headers }))
            .pipe(finalize(() => this.ngxUtilsLoadingService.set('HTTP', false)));
    }
}
