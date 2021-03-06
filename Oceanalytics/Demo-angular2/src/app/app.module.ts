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

import { ServerService } from './server/server.service';
import { KafkaProxyService } from 'app/services/KafkaProxy/kafka-proxy.service';
import { ConsumerApi } from 'app/services/kafka-rest/api/ConsumerApi';
import { TopicApi } from 'app/services/kafka-rest/api/TopicApi';

import { BASE_PATH } from 'app/services/kafka-rest/variables';
import { environment } from 'environments/environment';
import { TabularTableComponent } from './tabular-table/tabular-table.component';

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
    ServerService,
    KafkaProxyService,
    ConsumerApi,
    TopicApi,
    {
      provide: BASE_PATH, useValue: environment.kafka_rest_proxy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
