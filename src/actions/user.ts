import { CALL_API } from '../middleware/remote-action';
import { Schemas } from '../schemas/schemas';

export const USER_GET_ALL = 'USER_GET_ALL';
export const USER_GET_ALL_REQUEST = 'USER_GET_ALL_REQUEST';
export const USER_GET_ALL_SUCCESS = 'USER_GET_ALL_SUCCESS';
export const USER_GET_ALL_ERROR = 'USER_GET_ALL_ERROR';

function fetchUsers(id: string) {
  return {
    payload: {
      id
    },
    [CALL_API]: {
      types: [
        USER_GET_ALL_REQUEST,
        USER_GET_ALL_SUCCESS,
        USER_GET_ALL_ERROR
      ],
      endpoint: `/users-${id}.json`,
      method: 'GET',
      headers: {},
      schema: Schemas.ALL_USERS
    }
  };
}

export function getUsers(id: string) {
  return dispatch => dispatch(fetchUsers(id));
};

export const userActions = { getUsers };
