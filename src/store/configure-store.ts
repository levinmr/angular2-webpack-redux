let fn;

if (process.env.ENV === 'build') {
  fn = require('./configure-store-prod').default;
} else {
  fn = require('./configure-store-dev').default;
}

export default fn;

