import configureStore from './store/configure-store';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { provider } from 'ng2-redux';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AppComponent } from './containers/app.component';
import syncHistoryWithStore from './router-redux/sync';

require('./style/app.scss');

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

const createHashHistory = require('history/lib/createHashHistory');
const history = createHashHistory();
const store = configureStore({}, history);
syncHistoryWithStore(history, store);


bootstrap(AppComponent, [
    // These are dependencies of our App
    provider(store),
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...ENV_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ])
  .catch(err => console.error(err));
