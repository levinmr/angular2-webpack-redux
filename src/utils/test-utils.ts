const validKeys = ['type', 'payload', 'error', 'meta'];

function isObject(src): boolean {
  return src !== undefined && src !== null && typeof src === 'object';
}

function isValidKey(key): boolean {
  return validKeys.indexOf(key) > -1;
}

export function isStandardAction(action): boolean {
  return isObject(action) && Object.keys(action).every(isValidKey);
};
