import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {SelectModule} from 'angular2-select';

import { route } from './route';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ServerComponent } from './server/server.component';
import { TabularTableComponent } from './tabular-table/tabular-table.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { KafkaProxyService } from 'app/services/KafkaProxy/kafka-proxy.service';
import { ConsumerApi } from 'app/services/kafka-rest/api/ConsumerApi';
import { TopicApi } from 'app/services/kafka-rest/api/TopicApi';
import { FakeDataService } from 'app/services/fake-data/api/fake-data.service';

import { BASE_PATH } from 'app/services/kafka-rest/variables';
import { environment } from 'environments/environment';

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
  providers: [
    KafkaProxyService,
    FakeDataService,
    ConsumerApi,
    TopicApi,
    {provide: BASE_PATH, useValue: environment.kafka_rest_proxy},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
