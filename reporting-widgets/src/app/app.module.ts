import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarchartFormComponent } from './barchart-form/barchart-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdButtonModule, MdSelectModule, MdInputModule, MdIconModule, MdGridListModule } from '@angular/material';
import {FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { FormExampleComponent } from './form-example/form-example.component';
import {GridsterModule} from 'angular-gridster2';
import { GridsterDemoComponent } from './gridster-demo/gridster-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    BarchartFormComponent,
    FormExampleComponent,
    GridsterDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdGridListModule,
    FlexLayoutModule,
    MdSelectModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
