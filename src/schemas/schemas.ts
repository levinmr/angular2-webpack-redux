const { Schema, arrayOf } = require('normalizr');

const userSchema = new Schema('users', {
  idAttribute: user => user.id
});

export const Schemas = {
  USER: userSchema,
  ALL_USERS: {
    users: arrayOf(userSchema)
  }
};
