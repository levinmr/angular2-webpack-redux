import { AppState } from '../store/app-state';
import { AsyncPipe } from '@angular/common';
import { Component, ApplicationRef, OnDestroy } from '@angular/core';
import { getUsers } from '../actions/user';
import { MapToArrayPipe } from '../pipes/pipes';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { UsersControlsComponent } from '../components/users-controls.component';
import { UsersTableComponent } from '../components/users-table.component';

@Component({
  selector: 'mc-users-page',
  pipes: [AsyncPipe, MapToArrayPipe],
  directives: [UsersControlsComponent, UsersTableComponent],
  template: `
    <div class="container-fluid">
      <div class="page-header">
        <h1>Users</h1>
      </div>

      <mc-users-controls
        (onClick)="getUsers($event)"
        [pending]="getAllPending$"
        [error]="getAllError$"></mc-users-controls>

      <mc-users-table
        [users]="users$ | async | mcMapToArray"></mc-users-table>
    </div>
  `
})
export class UsersPageComponent implements OnDestroy {
  private ngRedux: NgRedux<AppState>;
  private unsubscribe: () => void;
  private users$: Observable<any>;
  private getAllPending$: Observable<boolean>;
  private getAllError$: Observable<string>;

  constructor(
    ngRedux: NgRedux<AppState>,
    applicationRef: ApplicationRef) {

    const user$ = ngRedux.select<Map<string, any>>('user');

    this.ngRedux = ngRedux;
    this.users$ = user$.map(s => s.get('users'));
    this.getAllPending$ = user$.map(s => s.get('getAllPending'));
    this.getAllError$ = user$.map(s => s.get('getAllError'));

    ngRedux.mapDispatchToTarget((dispatch) => {
      return {
        getUsers: (id) => dispatch(getUsers(id))
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
