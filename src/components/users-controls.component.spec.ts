import {
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {Observable} from 'rxjs';
import {UsersControlsComponent} from './users-controls.component.ts';

describe('UsersControlsComponent', () => {
  beforeEachProviders(() => [
    UsersControlsComponent
  ]);

  describe('handleClick1', () => {
    it('should emit event with "1" when Get Users 1 is clicked',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb
          .overrideProviders(UsersControlsComponent, [])
          .createAsync(UsersControlsComponent)
          .then((fixture) => {
            // let component = fixture.componentInstance;
            // // Mock the original component and set the state the attributes on
            // // the component.
            // component.pending = Observable.of(false);
            // component.error = Observable.of(null);
            // spyOn(component.onClick, 'emit');

            // let element = fixture.nativeElement;
            // let btn = element.querySelector('#button1');
            // btn.click();
            // fixture.detectChanges();

            // expect(component.onClick.emit).toHaveBeenCalledWith('1');

          });
      }
    ));

    it('should disable the button when pending is true', () => {

    });

    it('should display the pending (loading) label when pending is true', () => {

    });

    it('should display the error label when error is truthy', () => {

    });

  });

});
