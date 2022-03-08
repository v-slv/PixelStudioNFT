import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemHierachyComponent } from './item-hierachy/item-hierachy.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemHierachyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
