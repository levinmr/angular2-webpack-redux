import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'mc-users-controls',
  directives: [],
  pipes: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-fluid">
      <button
        [disabled]="pending | async"
        (click)="handleClick1()"
        class="btn btn-default">Get Users 1</button>
      <button
        [disabled]="pending | async"
        (click)="handleClick2()"
        class="btn btn-default">Get Users 2</button>
      <button
        [disabled]="pending | async"
        (click)="handleClick3()"
        class="btn btn-default">Get Users 3</button>
      <span *ngIf="pending | async">Loading...</span>
      <span *ngIf="error | async">There was an error</span>
    </div>
  `
})
export class UsersControlsComponent {
  @Input() pending = false;
  @Input() error = null;
  @Output() onClick: EventEmitter<Object> = new EventEmitter();

  /* tslint:disable-next-line:no-unused-variable */
  private handleClick1() {
    this.onClick.emit('1');
  }

  /* tslint:disable-next-line:no-unused-variable */
  private handleClick2() {
    this.onClick.emit('2');
  }

  /* tslint:disable-next-line:no-unused-variable */
  private handleClick3() {
    this.onClick.emit('3');
  }
};


