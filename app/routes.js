const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.get('/teste2', (req, res) => res.send('Hello world!'));
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * ===========
 * Auth routes
 */

routes.use(authMiddleware);

/**
 * ===========
 * Users
 */
routes
  .get('/users', controllers.userController.index)
  .get('/users/me', controllers.userController.me)
  .get('/users/feed', controllers.userController.feed)
  .put('/users', controllers.userController.update);

/**
 * ===========
 * Follows
 */
routes
  .post('/follow/:id', controllers.followController.create)
  .delete('/unfollow/:id', controllers.followController.destroy);

/**
 * ===========
 * Tweets
 */
routes
  .post('/tweets', controllers.tweetController.create)
  .delete('/tweets/:id', controllers.tweetController.destroy);

/**
 * ==========
 * Likes
 */
routes
  .post('/likes/:id', controllers.likeController.toggle);

module.exports = routes;
