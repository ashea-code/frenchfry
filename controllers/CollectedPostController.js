const express = require('express');

const Collection = require('../models').Collection;
const Post = require('../models').Post;

const auth = require('../helpers/AuthHelper.js');
const error = require('../helpers/ErrorHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const router = new express.Router();

router.use(respHelpers.setJSON);
router.use(auth.ensureAuthed);

// POST

router.post('/:id/collection', async (req, res) => {
  const collectionIDsToAdd = req.body.collections;
  const postId = req.params.id;

  if (collectionIDsToAdd.constructor !== Array) {
    return error.badRequest(res, '"collections" must be an array of collection IDs.');
  }

  const collections = Collection.findAll({ where: { id: collectionIDsToAdd, authorId: req.user.id } });
  const post = Post.findOne({ where: { id: postId } });

  return Promise.all([collections, post]).then((results) => {
    const foundCollections = results[0];
    const foundPost = results[1];

    // You cannot collect a post you don't own
    if (foundPost.authorId !== req.user.id) {
      return error.noAuthorized(res);
    }

    return foundPost.addCollections(foundCollections).then((collections) => {
      res.send(collections);
    });
  }).catch(err => error.badRequest(res, err.errors[0].message));
});

// DELETE

router.delete('/:id/collection', async (req, res) => {
  const collectionIDsToRemove = req.body.collections;
  const postId = req.params.id;

  if (collectionIDsToRemove.constructor !== Array) {
    return error.badRequest(res, '"collections" must be an array of Collection IDs.');
  }

  const collections = Collection.findAll({
    where: {
      id: collectionIDsToRemove,
      authorId: req.user.id,
    },
  });

  const post = Post.findOne({ where: { id: postId } });

  return Promise.all([collections, post]).then((results) => {
    const foundCollections = results[0];
    const foundPost = results[1];

    // You cannot un-collect a post you don't own
    if (foundPost.authorId !== req.user.id) {
      return error.noAuthorized(res);
    }

    return foundPost.removeCollections(foundCollections).then(() => {
      res.send(foundPost);
    });
  }).catch(err => error.badRequest(res, err.errors[0].message));
});

module.exports = router;
