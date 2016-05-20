import { TestComponentBuilder } from '@angular/compiler/testing';
import { UsersTableComponent } from './users-table.component';

import {
  describe,
  expect,
  it,
  injectAsync,
  beforeEachProviders
} from '@angular/core/testing';


describe('UsersTableComponent', () => {

  it('outputs anything',
     injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

     return tcb.createAsync(UsersTableComponent)
       .then((fixture) => {
         expect(fixture.componentInstance.users).toBe(undefined);
       });
  }));

});
