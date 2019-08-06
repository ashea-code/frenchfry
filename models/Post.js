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
    unique: true,
  },
  subtitle: {
    type: types.TEXT,
  },
  content: {
    type: types.TEXT,
    required: true,
  },
  posted: {
    type: types.DATE,
    default: false,
  },
  nsfw: {
    type: types.BOOLEAN,
    default: false,
  },
  type: {
    type: types.ENUM,
    required: true,
    values: Object.values(PostTypes),
  },
}
