const types = require('./types.js').ModelAttributeTypes;
const PostTypes = require('../constants/PostTypes');

module.exports = {
  title: {
    type: types.STRING,
    required: true,
  },
  subtitle: {
    type: types.STRING,
  },
  slug: {
    type: types.STRING,
    required: true,
    unique: true,
  },
};
