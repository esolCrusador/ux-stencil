import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'bypassDomSecurityPipe'
})
export class BypassDomSecurityPipe implements PipeTransform {
    constructor(
        private readonly domSanitizer: DomSanitizer,
    ) {
    }

    public transform(base64: string): SafeUrl {
        return this.domSanitizer.bypassSecurityTrustUrl(base64);
    }
}
