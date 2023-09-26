import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

import { Helper } from '@webilix/helper-library';

@Pipe({ name: 'ngxHelperSafe' })
export class NgxHelperSafePipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    transform(
        value: string,
        config?: { type?: 'HTML' | 'STYLE' | 'SCRIPT' | 'URL' | 'RESOURCE_URL' },
    ): string | SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        if (!Helper.IS.string(value) || value === '') return '';

        switch (config?.type || 'HTML') {
            case 'STYLE':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'SCRIPT':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'URL':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'RESOURCE_URL':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'HTML':
            default:
                return this.sanitizer.bypassSecurityTrustHtml(value);
        }
    }
}
