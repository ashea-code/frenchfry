const express = require('express');
const passport = require('passport');

const auth = require('../helpers/AuthHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const router = new express.Router();

router.use(respHelpers.setJSON);

router.post('/', passport.authenticate('local'), (req, res) => res.redirect('/api/auth/me'));

router.get('/check', (req, res) => {
  res.send({
    authenticated: req.isAuthenticated(),
  });
});

router.use('/me', auth.ensureAuthed);
router.get('/me', (req, res) => {
  res.send(req.user);
});

router.use('/logout', auth.ensureAuthed);
router.get('/logout', (req, res) => {
  req.logout();
  res.send({ status: 200 });
});

module.exports = router;
