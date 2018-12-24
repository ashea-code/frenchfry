const makeSlug = require('slug');
const express = require('express');
const sanitizeHtml = require('sanitize-html');

const Post = require('../models').Post;
const Tag = require('../models').Tag;

const auth = require('../helpers/AuthHelper.js');
const error = require('../helpers/ErrorHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const PostTypes = require('../constants/PostTypes');

const router = new express.Router();

router.use(respHelpers.setJSON);

// GET

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  Post.findOne({ where: { id }, include: [Tag] }).then((post) => {
    if (!post) {
      return error.notFound(res, 'Post not found.');
    }

    return res.send(post);
  });
});

router.get('/', async (req, res) => {
  const id = req.query.id;
  const slug = req.query.slug;

  const searchParams = { };

  if (id) {
    searchParams.id = id;
  }

  if (slug) {
    searchParams.slug = slug;
  }

  Post.findAll({ where: searchParams, limit: 100, include: [Tag] }).then((posts) => {
    if (!posts) {
      return error.notFound(res, 'No Posts Found.');
    }

    return res.send(posts);
  });
});

// All routes from now on need auth
router.use(auth.ensureAuthed);

// POST

router.post('/', async (req, res) => {
  // Validate post type
  const type = req.body.type;

  if (Object.values(PostTypes).indexOf(type) < 0) {
    return error.badRequest(res, 'Invalid post type.');
  }

  // Validate title
  let title = req.body.title;
  let subtitle = req.body.subtitle;

  if (!title || !subtitle) {
    return error.badRequest(res, '"title" and "subtitle must be provided.');
  }

  // Clean all HTML from title and subtitle
  title = sanitizeHtml(title, { allowedTags: [], allowedAttributes: [] });
  subtitle = sanitizeHtml(subtitle, { allowedTags: [], allowedAttributes: [] });

  // Validate post content
  let content = req.body.content;
  if (!content) {
    return error.badRequest(res, '"content" must be provided.');
  }

  switch (type) {
    case PostTypes.TEXT:
      // Clean out unsafe HTML from text posts
      // We allow 'b', 'i', 'em', 'strong', 'a'
      content = sanitizeHtml(content);
      break;
    default:
      return error.internalError(res, 'Post type not supported.');
  }

  const nsfw = req.body.nsfw || false;
  const authorId = req.user.id;
  const posted = new Date();

  // Generate a slug for this post
  const slug = makeSlug(title);

  const post = {
    title,
    slug,
    subtitle,
    content,
    posted,
    nsfw,
    type,
    authorId,
  };

  // Try and save the post
  return Post.create(post).then((newPost) => {
    res.status(201);
    res.send(newPost);
  }).catch(err => error.badRequest(res, err.errors[0].message));
});

// PATCH
router.patch('/:id', async (req, res) => {
  const patchParams = {};

  let title = req.body.title;
  let subtitle = req.body.subtitle;
  let content = req.body.content;
  let posted = req.body.posted;
  const nsfw = req.body.nsfw;

  if (title) {
    title = sanitizeHtml(title, { allowedTags: [], allowedAttributes: [] });
    patchParams.title = title;
    patchParams.slug = makeSlug(title);
  }

  if (subtitle) {
    subtitle = sanitizeHtml(subtitle, { allowedTags: [], allowedAttributes: [] });
    patchParams.subtitle = subtitle;
  }

  if (content) {
    content = sanitizeHtml(content);
    patchParams.content = content;
  }

  if (posted) {
    posted = Date.parse(posted);

    // If we could not parse a valid date default to now
    if (!posted) {
      posted = new Date();
    }

    patchParams.posted = posted;
  }

  if (nsfw || nsfw === false) {
    patchParams.nsfw = nsfw;
  }

  // Test existing post
  const existingPost = await Post.findOne({
    where: {
      id: req.params.id,
      authorId: req.user.id,
    },
  });

  if (!existingPost) {
    return error.notFound(res, 'Post not found.');
  }

  return existingPost.update(patchParams)
    .then(newPost => res.send(newPost))
    .catch(err => error.badRequest(res, err.errors[0].message));
});

// DELETE

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  Post.findOne({ where: { id } }).then((post) => {
    if (!post) {
      return error.notFound(res, 'Post not found.');
    }

    // Check ownership
    if (post.authorId !== req.user.id) {
      return error.notAuthorized(res);
    }

    return Post.destroy({ where: { id: post.id } }).then(() => {
      res.status(204);
      return res.send({});
    });
  });
});

module.exports = router;
