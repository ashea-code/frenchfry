const types = require('./types.js').ModelAttributeTypes;
const PostTypes = require('../constants/PostTypes');

module.exports = {
  email: {
    type: types.STRING,
    required: true,
    unique: true,
  },
  displayname: {
    type: types.STRING,
    required: true,
  },
  passwordHash: {
    type: types.STRING,
    required: true,
  },
  username: {
    type: types.STRING,
    required: true,
    unique: true,
  },
};
