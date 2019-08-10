module.exports = [
  // Posts belong to a user
  {
    this: 'Post',
    belongsTo: 'User',
    as: 'author',
  },

  // Tags belong to a user
  {
    this: 'Tag',
    belongsTo: 'User',
    as: 'author',
  },

  // Collections belong to a user
  {
    this: 'Collection',
    belongsTo: 'User',
    as: 'author',
  },

  // SiteProps belong to a user (or, "a user owns the site")
  {
    this: 'SiteProps',
    belongsTo: 'User',
    as: 'owner',
  },

  // Posts can belong to many tags
  {
    this: 'Post',
    belongsToMany: 'Tag',
    as: 'tagged_posts'
  },

  // Posts can belong to many collections
  {
    this: 'Post',
    belongsToMany: 'Collection',
    as: 'collected_posts',
  },
];
