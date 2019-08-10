const Builder = require('../helpers/ModelBuilder.js');

////// Register models here

const Post = require('./Post.js');
const SiteProps = require('./SiteProps.js');
const Collection = require('./Collection.js');
const Tag = require('./Tag.js');
const User = require('./User.js');

const built = Builder({
  Post,
  SiteProps,
  Collection,
  Tag,
  User,
});

////// Stop registering models here

const fetchBackendModels = () => {
  const temp = {};
  Object.values(built.models).forEach((mdl) => {
    temp[mdl.tableName] = mdl.m;
  });

  return temp;
}

const fetchReactType = () => {
  const temp = {};
  Object.values(built.models).forEach((mdl) => {
    temp[mdl.tableName] = mdl.reactType;
  });

  return temp;
}

const models = module.exports = fetchBackendModels();
models.react = fetchReactType();
models.database = built.database;
