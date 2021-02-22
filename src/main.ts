import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  let href = document.getElementsByTagName('base')[0].href;
  if (href.endsWith('/'))
    href = href.substring(0, href.length - 1);

  return href;
}

const providers = [
  { provide: APP_BASE_HREF, useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic(providers).bootstrapModule(AppBrowserModule)
    .catch(err => console.error(err));
});
