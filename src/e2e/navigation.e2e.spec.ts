import { NavBarPage } from './page-objects/navbar.page';

describe('UI Starter application', () => {
  let navbarpage = new NavBarPage();

  it('should have a title', (done) => {
    expect(navbarpage.navbarHeader.getText()).toEqual('medCPU UI Starter');
    done();
  });
});
