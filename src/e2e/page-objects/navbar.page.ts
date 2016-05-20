/// <reference path="../../../typings/browser.d.ts" />
import { ElementFinder } from 'protractor';

/**
 * Main navigation bar page object
 */
export class NavBarPage {
  /** @type {ElementFinder} main nav bar element to return to home page */
  public navbarHeader: ElementFinder;

  constructor() {
    this.navbarHeader = element(by.css('.navbar-brand'));
  }
}
