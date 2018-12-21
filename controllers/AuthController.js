const express = require('express');
const passport = require('passport');

const auth = require('../helpers/AuthHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const router = new express.Router();

router.use(respHelpers.setJSON);

router.post('/', passport.authenticate('local'), (req, res) => res.status(200));

router.use('/me', auth.ensureAuthed);
router.get('/me', (req, res) => {
  res.send(req.user);
});

module.exports = router;
