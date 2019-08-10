const types = require('./types.js').ModelAttributeTypes;
const PostTypes = require('../constants/PostTypes');

module.exports = {
  title: {
    type: types.STRING,
    required: true,
  },
  slug: {
    type: types.STRING,
    required: true,
  },
  nsfw: {
    type: types.BOOLEAN,
    required: true,
    default: false,
  },
};
