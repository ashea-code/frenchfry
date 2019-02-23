const express = require('express');
const sanitizeHtml = require('sanitize-html');

const SiteProps = require('../models').SiteProps;

const auth = require('../helpers/AuthHelper.js');
const error = require('../helpers/ErrorHelper.js');
const respHelpers = require('../helpers/RespHelper.js');

const router = new express.Router();

router.use(respHelpers.setJSON);

router.get('/', async (req, res) => {
  const currentSiteProps = await SiteProps.findOne();
  if (!currentSiteProps) {
    return error.badRequest(res, 'Site is not set up yet');
  }

  return res.send(currentSiteProps);
});

router.post('/', async (req, res) => {
  // Do not allow the site to be set up twice
  const currentSiteProps = await SiteProps.findOne();
  if (currentSiteProps) {
    return error.badRequest(res, 'Site is already set up.');
  }

  let siteTitle = req.body.siteTitle || 'Untitled';
  let siteDescription = req.body.siteDescription || '';
  const ownerId = req.user.id;

  siteTitle = sanitizeHtml(siteTitle, { allowedTags: [], allowedAttributes: [] });
  siteDescription = sanitizeHtml(siteDescription, { allowedTags: [], allowedAttributes: [] });

  const newProps = {
    siteTitle,
    siteDescription,
    ownerId,
  };

  const site = await SiteProps.create(newProps);

  return res.send(site);
});

// The reset of these routes require auth
router.use(auth.ensureAuthed);

router.patch('/', async (req, res) => {
  let siteTitle = req.body.siteTitle;
  let siteDescription = req.body.siteDescription;

  const currentSiteProps = await SiteProps.findOne();
  if (!currentSiteProps) {
    return error.badRequest(res, 'This site is not set up yet.');
  }

  if (currentSiteProps.ownerId !== req.user.id) {
    return error.notAuthorized(res);
  }

  const patchParams = {};

  if (siteTitle) {
    siteTitle = sanitizeHtml(siteTitle, { allowedTags: [], allowedAttributes: [] });
    patchParams.siteTitle = siteTitle;
  }

  if (siteDescription) {
    siteDescription = sanitizeHtml(siteDescription, { allowedTags: [], allowedAttributes: [] });
    patchParams.siteDescription = siteDescription;
  }

  const newSite = await currentSiteProps.update(patchParams);
  return res.send(newSite);
});

module.exports = router;
