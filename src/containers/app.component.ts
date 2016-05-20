import { AppState } from '../store/app-state';
import { AsyncPipe } from '@angular/common';
import { Component, ApplicationRef, OnDestroy } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { Map } from 'immutable';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { UsersPageComponent } from './users-page.component';
import { changeRoute } from '../actions/app';

@Component({
  selector: 'mc-starter-app',
  pipes: [ AsyncPipe ],
  directives: [...ROUTER_DIRECTIVES],
  providers: [],
  template: `
    <header class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand">{{title$ | async}}</a>
        </div>
        <nav>
          <ul class="nav navbar-nav navbar-right">
            <li><a (click)="changeRoute('/')">Home</a></li>
            <li><a (click)="changeRoute('/users')">Users</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {path: '/', component: HomePageComponent, name: 'Home'},
  {path: '/users', component: UsersPageComponent, name: 'Users'}
])
export class AppComponent implements OnDestroy {
  private ngRedux: NgRedux<AppState>;
  private unsubscribe: () => void;

  private title$: Observable<string>;

  constructor(
    ngRedux: NgRedux<AppState>,
    applicationRef: ApplicationRef) {

    const app$ = ngRedux.select<Map<string, any>>('app');

    this.ngRedux = ngRedux;
    this.title$ = app$.map(s => s.get('title'));

    ngRedux.mapDispatchToTarget((dispatch) => {
      return {
        changeRoute: (path) => dispatch(changeRoute(path))
      };
    })(this);

    this.unsubscribe = ngRedux.subscribe(() => {
      applicationRef.tick();
    });

  }

  ngOnDestroy() {
    this.unsubscribe();
  }
};
