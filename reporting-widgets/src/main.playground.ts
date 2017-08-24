/**
 * Created by lnthao on 8/24/2017.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializePlayground} from 'angular-playground';
import {MyPlaygroundModule} from './my-playground.module';

initializePlayground('app-root');
platformBrowserDynamic().bootstrapModule(MyPlaygroundModule);
