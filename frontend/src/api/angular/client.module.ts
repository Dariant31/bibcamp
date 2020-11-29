import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BibcampAPI } from './client';
import { SecurityOptions } from '../schemas';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers:    [ BibcampAPI ],
})
export class ClientModule {
  constructor( @Optional() @SkipSelf() parentModule: ClientModule) {
    if (parentModule) {
      throw new Error('ClientModule is already loaded. Import your base AppModule only.');
    }
  }
}
