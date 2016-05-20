import { OrderByPipe } from '../pipes/pipes';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'mc-users-table',
  directives: [],
  pipes: [OrderByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-fluid">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users | mcOrderBy:['lastName','firstName']">
            <td>{{user.id}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UsersTableComponent {
  @Input() users: any[];
};
