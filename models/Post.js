const types = require('./types.js').ModelAttributeTypes;

module.exports = {
  title: { type: types.STRING },
  slug: { type: types.STRING },
  subtitle: { type: types.TEXT },
  content: { type: types.TEXT },
  posted: { type: types.BOOLEAN },
  nsfw: { type: types.BOOLEAN },
  type: { type: types.ENUM },
}
