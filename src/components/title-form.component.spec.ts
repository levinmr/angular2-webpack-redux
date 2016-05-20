import { TestComponentBuilder } from '@angular/compiler/testing';
import { TitleFormComponent } from './title-form.component';

import {
  describe,
  expect,
  it,
  injectAsync,
  beforeEachProviders
} from '@angular/core/testing';

describe('TitleFormComponent', () => {

  it('should emit submit event with specified title value',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    return tcb.createAsync(TitleFormComponent)
      .then((fixture) => {
        // const uut: TitleFormComponent = fixture.componentInstance;
        // const el: HTMLElement = fixture.nativeElement;

        // spyOn(uut.onSubmit, 'emit');

        // const input = <HTMLInputElement> el.querySelector('input');
        // const btn = <HTMLButtonElement> el.querySelector('button');

        // input.value = 'foo';
        // uut['title'] = 'foo';
        // btn.click();

        // fixture.detectChanges();
        // expect(uut.onSubmit.emit).toHaveBeenCalled();
      });
  }));

});
