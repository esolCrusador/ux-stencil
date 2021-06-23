import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { InfrastructureServerModule } from './features/infrastructure/infrastructure.server.module';
import { LoggingServerModule } from './features/logging/logging.server.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,

   InfrastructureServerModule,
   LoggingServerModule,

    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
