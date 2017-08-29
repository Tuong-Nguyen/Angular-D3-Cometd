import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarchartFormComponent } from './barchart-form/barchart-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdButtonModule, MdSelectModule, MdInputModule, MdIconModule, MdGridListModule, MdTabsModule } from '@angular/material';
import {FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { FormExampleComponent } from './form-example/form-example.component';
import {GridsterModule} from 'angular-gridster2';
import { GridsterDemoComponent } from './gridster-demo/gridster-demo.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'gridster', component: GridsterDemoComponent},
  {path: 'form-example', component: FormExampleComponent}
];
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
    GridsterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
