import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxUtilsModule } from '@ngx-utils';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, NgxUtilsModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
