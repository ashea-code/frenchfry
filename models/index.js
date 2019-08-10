const Builder = require('../helpers/ModelBuilder.js');

const Post = require('./Post.js');
const SiteProps = require('./SiteProps.js');
const Collection = require('./Collection.js');
const Tag = require('./Tag.js');
const User = require('./User.js');

module.exports = Builder({
  Post,
  SiteProps,
  Collection,
  Tag,
  User,
});
