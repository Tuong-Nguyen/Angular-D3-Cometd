import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ServerComponent } from './server/server.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'client', component: ClientComponent },
  { path: 'server', component: ServerComponent }
];

export const route = RouterModule.forRoot(routes);
