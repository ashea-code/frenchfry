const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);

const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const logger = require('node-color-log');

const models = require('./models');
const config = require('./config');

const AuthHelper = require('./helpers/AuthHelper.js');

// Build models and sync database tables
logger.info('Going to sync DB schema...');
models.database.sync();

// Build express server
const app = express();

app.use(session({
  store: new FileStore({ logFn: logger.info.bind(logger) }),
  resave: true,
  saveUninitialized: false,
  secret: config.secretToken,
}));
app.use(bodyParser.json());
app.use(express.json());

// Build auth options
passport.use(new Strategy(AuthHelper.userDatabaseCheck));

// Assign routes
app.use('/api/auth', require('./controllers/AuthController'));

app.listen(config.serverPort, () => logger.info(`Frenchfry is now running on port ${config.serverPort}!`));
