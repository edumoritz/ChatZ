import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';
import { ApolloConfigModule } from '../apollo-config.module';
import { MatListModule, MatToolbarModule } from '../../../node_modules/@angular/material';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    ApolloConfigModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
