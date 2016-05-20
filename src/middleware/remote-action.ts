const normalizr = require('normalizr');
const { normalize } = normalizr;
import 'isomorphic-fetch';
import { Action } from '../actions/action';

const API_ROOT = '/stubs';

export const CALL_API = 'CALL_API';

function callApi(endpoint, method, headers, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ?
    API_ROOT + endpoint :
    endpoint;

  return fetch(fullUrl, { method, headers })
    .then(checkStatus)
    .then(parseJson)
    .then(json => normalize(json, schema));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error['response'] = response;
    throw error;
  }
}

function parseJson(response) {
  return response.json().then(
    json => ({ json, originalResponse: response })
  ).then(
    ({ json, originalResponse }) => {
      if (!originalResponse.ok) {
        return Promise.reject(json);
      }

      return json;
    }
  );
}

function actionWith(action: Action, data: Action = null): Action {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[CALL_API];
  return finalAction;
}

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, schema, method, headers, types } = callAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const [ requestType, successType, errorType ] = types;
  next(actionWith(action, {type: requestType}));

  return callApi(endpoint, method, headers, schema).then(
    response => next(actionWith({
      type: successType,
      payload: {
        response
      }
    })),
    error => next(actionWith({
      type: errorType,
      error: error.message || 'Something broke'
    }))
  );
};
