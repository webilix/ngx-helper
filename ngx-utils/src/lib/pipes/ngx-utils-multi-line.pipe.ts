import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Helper } from '@webilix/helper-library';
import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsMultiLine' })
export class NgxUtilsMultiLinePipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    transform(value: string, html: boolean = false): string | SafeHtml {
        if (!Validator.VALUE.isString(value) || value === '') return '';

        return html
            ? this.sanitizer.bypassSecurityTrustHtml(value.replace(/(?:\r\n|\r|\n)/g, '<br />'))
            : Helper.STRING.escapeHTML(value).replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
}
