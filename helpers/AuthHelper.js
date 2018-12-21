const bcrypt = require('bcrypt');

const errors = require('./ErrorHelper');

const User = require('../models').User;


const userDatabaseCheck = (username, password, next) => {
  User.findOne({
    where: { email: username },
  }).then((user) => {
    if (!user) {
      return next('Auth Error', null);
    }

    bcrypt.compare(password, user.passwordHash, (res) => {
      if (!res) {
        return next('Auth Error', null);
      }

      return next(null, user);
    });

    return next('Auth Error', null);
  });
};

const ensureAuthed = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return errors.notAuthorized(res);
};

module.exports = {
  userDatabaseCheck,
  ensureAuthed,
};
