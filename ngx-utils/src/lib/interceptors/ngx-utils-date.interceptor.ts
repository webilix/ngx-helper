import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Helper } from '@webilix/helper-library';

@Injectable()
export class NgxUtilsDateInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) this.convert(event.body);
            }),
        );
    }

    private convert(body: any): void {
        if (!body || !(body instanceof Object)) return;
        if (body instanceof Array) for (const item of body) this.convert(item);

        for (const key of Object.keys(body)) {
            const value: any = body[key];

            if (value instanceof Array) for (const item of value) this.convert(item);
            if (value instanceof Object) this.convert(value);
            if (Helper.IS.STRING.jsonDate(value)) body[key] = new Date(value);
        }
    }
}
