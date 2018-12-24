const makeSlug = require('slug');
const express = require('express');
const sanitizeHtml = require('sanitize-html');

const Collection = require('../models').Collection;

const auth = require('../helpers/AuthHelper.js');
const error = require('../helpers/ErrorHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const router = new express.Router();

router.use(respHelpers.setJSON);

// GET

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  Collection.findOne({ where: { id } }).then((collection) => {
    if (!collection) {
      return error.notFound(res, 'Collection not found.');
    }

    return res.send(collection);
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

  Collection.findAll({ where: searchParams, limit: 100 }).then((collections) => {
    if (!collections) {
      return error.notFound(res, 'No Collections Found.');
    }

    return res.send(collections);
  });
});

// All routes from now on need auth
router.use(auth.ensureAuthed);

// POST

router.post('/', async (req, res) => {
  const authorId = req.user.id;
  let title = req.body.title;
  let subtitle = req.body.subtitle;

  if (!title) {
    return error.badRequest(res, 'Collection "title" must be provided');
  }

  if (!subtitle) {
    return error.badRequest(res, 'Collection "subtitle" must be provided');
  }

  // Clean all HTML, slugify, and lowercase the collection title
  title = sanitizeHtml(title, { allowedTags: [], allowedAttributes: [] });
  const slug = makeSlug(title).toLowerCase();

  // Clean the subtitle
  subtitle = sanitizeHtml(subtitle, { allowedTags: [], allowedAttributes: [] });

  const collection = {
    slug,
    title,
    subtitle,
    authorId,
  };

  // Try and save the Collection
  return Collection.create(collection).then((newCollection) => {
    res.status(201);
    res.send(newCollection);
  }).catch(err => error.badRequest(res, err.errors[0].message));
});

// DELETE

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const collection = await Collection.findOne({ where: { id } });

  if (!collection) {
    return error.notFound(res, 'Collection not found.');
  }

  if (collection.authorId !== req.user.id) {
    return error.notAuthorized(res);
  }

  return collection.destroy().then(() => {
    res.status(204);
    return res.send({});
  });
});

module.exports = router;
