import { AppState } from '../store/app-state';
import { Component, ApplicationRef, OnDestroy } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { setTitle } from '../actions/app';
import { TitleFormComponent } from '../components/title-form.component';

@Component({
  selector: 'mc-home-page',
  template: `
    <div class="container-fluid">
      <div class="page-header">
        <h1>Home</h1>
      </div>
      <mc-title-form (onSubmit)="setTitle($event)"></mc-title-form>
    </div>
  `,
  directives: [TitleFormComponent]
})
export class HomePageComponent implements OnDestroy {
  private ngRedux: NgRedux<AppState>;
  private unsubscribe: () => void;

  constructor(
    ngRedux: NgRedux<AppState>,
    applicationRef: ApplicationRef) {

    this.ngRedux = ngRedux;

    ngRedux.mapDispatchToTarget((dispatch) => {
      return {
        setTitle: (title) => dispatch(setTitle(title))
      };
    })(this);

    this.unsubscribe = ngRedux.subscribe(() => {
      applicationRef.tick();
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
