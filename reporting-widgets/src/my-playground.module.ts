/**
 * Created by lnthao on 8/24/2017.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, PlaygroundCommonModule } from 'angular-playground';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PlaygroundCommonModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class MyPlaygroundModule {}
