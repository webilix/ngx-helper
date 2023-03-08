import { inject } from '@angular/core';
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

import { NgxHelperLoadingService } from '../providers';
import { NGX_HELPER_LOADING_HEADER } from '../ngx-helper.values';

export const NgxHelperLoadingInterceptor: HttpInterceptorFn = (request, next) => {
    const ngxHelperLoadingService = inject(NgxHelperLoadingService);

    const header: string | null = request.headers.get(NGX_HELPER_LOADING_HEADER);
    const loading: boolean = header === 'Y' || header === null;
    if (loading) ngxHelperLoadingService.set('HTTP', true);

    const headers: HttpHeaders = request.headers.delete(NGX_HELPER_LOADING_HEADER);
    return next(request.clone({ headers })).pipe(finalize(() => ngxHelperLoadingService.set('HTTP', false)));
};
