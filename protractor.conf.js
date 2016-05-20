require('ts-node/register');

exports.config = {
  baseUrl: 'http://localhost:8080/',

  specs: [
    'src/e2e/**/*.e2e.spec.ts'
  ],
  exclude: [
    'typings/**'
  ],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  directConnect: true,

  capabilities: {
    'browserName': 'chrome'
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    includeStackTrace: true,
    print: () => {} // no more dot reporter
  },

  onPrepare: function () {
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv()
      .addReporter(new SpecReporter({
        displayStacktrace: true
      }));

    browser.ignoreSynchronization = true;
    browser.get('/');
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true
};
