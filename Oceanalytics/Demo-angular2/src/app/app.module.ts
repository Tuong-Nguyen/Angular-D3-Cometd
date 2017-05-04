import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { route } from './route';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ServerComponent } from './server/server.component';

import { ServerService } from './server/server.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    route
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
