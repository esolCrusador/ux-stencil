import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { InfrastructureServerModule } from './features/infrastructure/infrastructure.server.module';
import { AppComponent } from './app.component';
import { LoggingServerModule } from '@ux-stencil/logging/logging.server.module';

@NgModule({
  imports: [
    AppModule,
    
   // InfrastructureServerModule,
   // LoggingServerModule,

    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
