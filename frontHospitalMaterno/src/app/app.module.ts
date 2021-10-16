import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeMX from '@angular/common/locales/es-MX';
registerLocaleData(localeMX);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    ChartsModule,
    SharedModule
  ],
  providers: [{provide:LOCALE_ID, useValue:"es-MX"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
