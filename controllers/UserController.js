const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models').User;

const error = require('../helpers/ErrorHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const router = new express.Router();

router.use(respHelpers.setJSON);

router.post('/', async (req, res) => {
  // Do some validation
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const displayname = req.body.displayname;

  if (!email || !username || !password || !displayname) {
    return error.badRequest(res, 'Fields were missing from the request.');
  }

  if (password.length < 8) {
    return error.badRequest(res, 'Password must be at least 8 characters long');
  }

  // Allow the first user to be made without auth
  const userCount = await User.count();
  if (userCount > 0) {
    if (!req.isAuthenticated()) {
      return error.notAuthorized(res);
    }
  }

  // Hash the password
  return bcrypt.hash(password, 5, (err, passwordHash) => {
    if (err) {
      return error.internalError(res, err);
    }

    // Try and save the user
    return User.create({
      email,
      username,
      displayname,
      passwordHash,
    }).then((user) => {
      res.status(201);
      res.send(user);
    }).catch(err => error.badRequest(res, err.errors[0].message));
  });
});

module.exports = router;
