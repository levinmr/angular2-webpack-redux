Error.stackTraceLimit = Infinity;

require('es6-shim');
require('reflect-metadata');

require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');

// const chai = require('chai');
// const chaiImmutable = require('chai-immutable');
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiImmutable);
// chai.use(chaiAsPromised);

/*
 Ok, this is kinda crazy. We can use the the context method on
 require that webpack created in order to tell webpack
 what files we actually want to require or import.
 Below, context will be a function/object with file names as keys.
 using that regex we are saying look in client/app and find
 any file that ends with '.spec.ts' and get its path. By passing in true
 we say do this recursively
 */
var appContext = require.context('./src', true, /^((?!e2e).)*\/*\.spec\.ts$/g);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
appContext.keys()
  .forEach(appContext);

// Select BrowserDomAdapter.
// see https://github.com/AngularClass/angular2-webpack-starter/issues/124
// Somewhere in the test setup
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.setBaseTestProviders(browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
