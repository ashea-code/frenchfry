const bcrypt = require('bcrypt');

const errors = require('./ErrorHelper');

const User = require('../models').User;


const userDatabaseCheck = (username, password, next) => {
  User.findOne({
    where: { username },
  }).then((user) => {
    if (!user) {
      return next('Auth Error', null);
    }

    return bcrypt.compare(password, user.passwordHash, (err, res) => {
      if (!res) {
        return next('Auth Error', null);
      }

      const cleanUser = {
        id: user.id,
        username: user.username,
        displayname: user.displayname,
        email: user.email,
      };

      return next(null, cleanUser);
    });
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
