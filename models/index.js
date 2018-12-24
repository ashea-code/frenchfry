const database = require('../database');

// Import base models
const UserModel = require('./User');
const PostModel = require('./Post');
const TagModel = require('./Tag');
const CollectionModel = require('./Collection');
const SitePropsModel = require('./SiteProps');

// Define them in context of the database
const User = database.define(UserModel.tableName, UserModel.schema);
const Post = database.define(PostModel.tableName, PostModel.schema);
const Tag = database.define(TagModel.tableName, TagModel.schema);
const Collection = database.define(CollectionModel.tableName, CollectionModel.schema);
const SiteProps = database.define(SitePropsModel.tableName, SitePropsModel.schema);

// Define model relations

// A user owns posts, tags, and collections
Post.belongsTo(User, { as: 'author' });
Tag.belongsTo(User, { as: 'author' });
Collection.belongsTo(User, { as: 'author' });

// A user owns the site
SiteProps.belongsTo(User, { as: 'owner' });

// A post can belong to many collections and many tags
Post.belongsToMany(Tag, { through: 'tagged_posts' });
Post.belongsToMany(Collection, { through: 'collected_posts' });

module.exports = {
  database,
  SiteProps,
  Collection,
  User,
  Post,
  Tag,
};
