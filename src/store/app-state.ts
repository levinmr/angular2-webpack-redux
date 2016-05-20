import {Map} from 'immutable';

export interface AppState {
  app: Map<string, any>;
  user: Map<string, any>;
};
