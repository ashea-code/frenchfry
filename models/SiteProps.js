const types = require('./types.js').ModelAttributeTypes;
const PostTypes = require('../constants/PostTypes');

module.exports = {
  siteTitle: {
    type: types.STRING,
    required: true,
  },
  siteDescription: {
    type: types.STRING,
  },
};
