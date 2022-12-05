import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Validator } from '@webilix/validator-library';

@Pipe({ name: 'ngxUtilsMultiLine' })
export class NgxUtilsMultiLinePipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    transform(value: string): SafeHtml {
        if (!Validator.VALUE.isString(value) || value === '') return '';
        return this.sanitizer.bypassSecurityTrustHtml(value.replace(/(?:\r\n|\r|\n)/g, '<br />'));
    }
}
