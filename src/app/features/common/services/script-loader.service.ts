import { Observable } from 'rxjs';
import { Inject, PLATFORM_ID, Injectable } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class ScriptLoaderService {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(PLATFORM_ID) private readonly platformId: Object,
    ) {
    }

    public loadScript(id: string, src: string): Observable<void> {
        if (this.document.getElementById(id))
            throw new Error(`The element with id '${id}' already exists.`);

        return new Observable<void>(observer => {
            const scriptElement = document.createElement('script');

            scriptElement.async = true;
            scriptElement.src = src;
            if (isPlatformBrowser(this.platformId)) {
                scriptElement.onload = () => {
                    observer.next();
                    observer.complete();
                };
                scriptElement.onerror = (event, source, line, column, error) => {
                    observer.error(error || `could not load script '${src}'`);
                };
            }

            const parentElement = this.document.head;
            parentElement.appendChild(scriptElement);

            if (isPlatformServer(this.platformId)) {
                observer.complete();
            }
        });
    }
}
