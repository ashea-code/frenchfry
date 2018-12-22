const makeSlug = require('slug');
const express = require('express');
const sanitizeHtml = require('sanitize-html');

const Post = require('../models').Post;

const auth = require('../helpers/AuthHelper.js');
const error = require('../helpers/ErrorHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const PostTypes = require('../constants/PostTypes');

const router = new express.Router();

router.use(respHelpers.setJSON);
router.use(auth.ensureAuthed);

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

module.exports = router;
