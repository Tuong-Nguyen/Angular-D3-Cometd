import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {SelectModule} from 'angular2-select';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { route } from './route';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ServerComponent } from './server/server.component';

import { ServerService } from './server/server.service';
import {TabularTableComponent} from './tabular-table/tabular-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ServerComponent,
    TabularTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    route,
    SelectModule
  ],
  providers: [ServerService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
