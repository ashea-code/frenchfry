const makeSlug = require('slug');
const express = require('express');
const sanitizeHtml = require('sanitize-html');

const Tag = require('../models').Tag;

const auth = require('../helpers/AuthHelper.js');
const error = require('../helpers/ErrorHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const router = new express.Router();

router.use(respHelpers.setJSON);

// GET

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  Tag.findOne({ where: { id } }).then((tag) => {
    if (!tag) {
      return error.notFound(res, 'Tag not found.');
    }

    return res.send(tag);
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

  Tag.findAll({ where: searchParams, limit: 100 }).then((tags) => {
    if (!tags) {
      return error.notFound(res, 'No Tags Found.');
    }

    return res.send(tags);
  });
});

// All routes from now on need auth
router.use(auth.ensureAuthed);

// POST

router.post('/', async (req, res) => {
  const authorId = req.user.id;
  const nsfw = req.body.nsfw || false;
  let title = req.body.title;

  if (!title) {
    return error.badRequest(res, 'Tag "title" must be provided');
  }

  // Clean all HTML, slugify, and lowercase the tag title
  title = sanitizeHtml(title, { allowedTags: [], allowedAttributes: [] });
  title = makeSlug(title).toLowerCase();

  const tag = {
    title,
    nsfw,
    authorId,
  };

  // Try and save the Tag
  return Tag.create(tag).then((newTag) => {
    res.status(201);
    res.send(newTag);
  }).catch(err => error.badRequest(res, err.errors[0].message));
});

// DELETE

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  Tag.findOne({ where: { id } }).then((tag) => {
    if (!tag) {
      return error.notFound(res, 'Tag not found.');
    }

    // Check ownership
    if (tag.authorId !== req.user.id) {
      return error.notAuthorized(res);
    }

    return Tag.destroy({ where: { id: tag.id } }).then(() => {
      res.status(204);
      return res.send({});
    });
  });
});

module.exports = router;
