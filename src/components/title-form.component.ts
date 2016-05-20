import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'mc-title-form',
  directives: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      class="form-inline"
      (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          class="form-control"
          type="text"
          placeholder="Page Title"
          required
          [(ngModel)]="title" />
      </div>
      <button class="btn btn-default" type="submit">Set Title</button>
    </form>
  `
})
export class TitleFormComponent {
  @Output() onSubmit: EventEmitter<Object> = new EventEmitter();
  private title: string;

  constructor() {
    this.reset();
  }

  /* tslint:disable-next-line:no-unused-variable */
  private handleSubmit() {
    if (this.title) {
      this.onSubmit.emit(this.title);
    }
  }

  private reset() {
    this.title = '';
  }
};
