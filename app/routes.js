const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes
  .post('/signup', controllers.authController.signup)
  .post('/signin', controllers.authController.signin);

/**
 * ===========
 * Auth routes
 */

routes.use(authMiddleware);

routes
  .get('/tweets', (req, res) => {
    console.log(req.userId);
    res.send('ok');
  });

/**
 * ===========
 * Users
 */
routes
  .put('/users', controllers.userController.update);

/**
 * ===========
 * Tweets
 */
routes
  .post('/tweets', controllers.tweetController.create)
  .delete('/tweets/:id', controllers.tweetController.destroy);

module.exports = routes;
