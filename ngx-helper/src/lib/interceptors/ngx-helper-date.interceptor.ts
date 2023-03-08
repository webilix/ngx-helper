import { HttpResponse, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

import { Helper } from '@webilix/helper-library';

export const NgxHelperDateInterceptor: HttpInterceptorFn = (request, next) => {
    const convert = (body: any): void => {
        if (!body || !(body instanceof Object)) return;
        if (body instanceof Array) for (const item of body) convert(item);

        for (const key of Object.keys(body)) {
            const value: any = body[key];

            if (value instanceof Array) for (const item of value) convert(item);
            if (value instanceof Object) convert(value);
            if (Helper.IS.STRING.jsonDate(value)) body[key] = new Date(value);
        }
    };

    return next(request).pipe(tap((event) => event instanceof HttpResponse && convert(event.body)));
};
