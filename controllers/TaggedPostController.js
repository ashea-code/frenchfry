const express = require('express');

const Tag = require('../models').Tag;
const Post = require('../models').Post;

const auth = require('../helpers/AuthHelper.js');
const error = require('../helpers/ErrorHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const router = new express.Router();

router.use(respHelpers.setJSON);
router.use(auth.ensureAuthed);

// POST

router.post('/:id/tag', async (req, res) => {
  const tagIDsToAdd = req.body.tags;
  const postId = req.params.id;

  if (tagIDsToAdd.constructor !== Array) {
    return error.badRequest(res, '"tags" must be an array of Tag IDs.');
  }

  const tags = Tag.findAll({ where: { id: tagIDsToAdd } });
  const post = Post.findOne({ where: { id: postId } });

  return Promise.all([tags, post]).then((results) => {
    const foundTags = results[0];
    const foundPost = results[1];

    // You cannot tag a post you don't own
    if (foundPost.authorId !== req.user.id) {
      return error.noAuthorized(res);
    }

    return foundPost.addTags(foundTags).then((tags) => {
      res.send(tags);
    });
  }).catch(err => error.badRequest(res, err.errors[0].message));
});

// DELETE

router.delete('/:id/tag', async (req, res) => {
  const tagIDsToAdd = req.body.tags;
  const postId = req.params.id;

  if (tagIDsToAdd.constructor !== Array) {
    return error.badRequest(res, '"tags" must be an array of Tag IDs.');
  }

  const tags = Tag.findAll({ where: { id: tagIDsToAdd } });
  const post = Post.findOne({ where: { id: postId } });

  return Promise.all([tags, post]).then((results) => {
    const foundTags = results[0];
    const foundPost = results[1];

    // You cannot untag a post you don't own
    if (foundPost.authorId !== req.user.id) {
      return error.noAuthorized(res);
    }

    return foundPost.removeTags(foundTags).then(() => {
      res.send(foundPost);
    });
  }).catch(err => error.badRequest(res, err.errors[0].message));
});

module.exports = router;
