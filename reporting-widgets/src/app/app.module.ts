import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarchartFormComponent } from './barchart-form/barchart-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdButtonModule, MdSelectModule, MdInputModule, MdIconModule, MdGridListModule } from '@angular/material';
import {FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { FormExampleComponent } from './form-example/form-example.component';

@NgModule({
  declarations: [
    AppComponent,
    BarchartFormComponent,
    FormExampleComponent
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
    MdSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
