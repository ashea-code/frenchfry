const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);

const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const logger = require('node-color-log');
const morgan = require('morgan');

const models = require('./models');
const config = require('./config');

const AuthHelper = require('./helpers/AuthHelper.js');

// Build models and sync database tables
logger.info('Going to sync DB schema...');
models.database.sync();

// Build express server
const app = express();
app.use(morgan('tiny'));

app.use(session({
  store: new FileStore({ logFn: logger.info.bind(logger) }),
  name: 'Frenchfry',
  resave: true,
  saveUninitialized: false,
  secret: config.secretToken,
}));
app.use(bodyParser.json());
app.use(express.json());

// Build auth options
passport.use(new Strategy(AuthHelper.userDatabaseCheck));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Assign routes
app.use('/api/auth', require('./controllers/AuthController'));
app.use('/api/user', require('./controllers/UserController'));
app.use('/api/post', require('./controllers/PostController'));
app.use('/api/tag', require('./controllers/TagController'));

app.listen(config.serverPort, () => logger.info(`Frenchfry is now running on port ${config.serverPort}!`));
